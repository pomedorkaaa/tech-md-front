import type { Task } from '../types';

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null || a === undefined || b === undefined) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return false;
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  return ja === jb;
}

export function formatValue(val: unknown): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

export function formatError(err: unknown): string {
  if (!(err instanceof Error)) return String(err);
  const name = err.constructor.name || 'Error';
  const msg = err.message;
  const stack = err.stack || '';
  const lineMatch = stack.match(/<anonymous>:(\d+):(\d+)/);
  const location = lineMatch ? ' (строка ' + lineMatch[1] + ', позиция ' + lineMatch[2] + ')' : '';
  return name + location + ': ' + msg;
}

export function runJavaScript(code: string, task: Task): string {
  const fnName = task.functionName;
  const testCases = task.testCases;

  if (!fnName || !testCases || testCases.length === 0) {
    return '\u26a0\ufe0f Для этой задачи тесты ещё не настроены.';
  }

  try {
    new Function(code);
  } catch (err: unknown) {
    return '\u274c SyntaxError\n\n' + formatError(err) + '\n\nКод не может быть выполнен — исправьте синтаксическую ошибку.';
  }

  try {
    const checkFn = new Function(code + '\nreturn typeof ' + fnName + ';');
    const fnType = checkFn();
    if (fnType !== 'function') {
      return '\u274c Функция "' + fnName + '" не найдена\n\nВаш код не содержит функцию с именем ' + fnName + '.\nУбедитесь, что имя функции совпадает с заданием.';
    }
  } catch (err: unknown) {
    return '\u274c ' + formatError(err) + '\n\nОшибка возникла при выполнении кода верхнего уровня (вне функции).';
  }

  const firstTc = testCases[0];
  try {
    const argsJson = JSON.stringify(firstTc.args);
    const probe = new Function(code + '\nreturn ' + fnName + '.apply(null, ' + argsJson + ');');
    probe();
  } catch (err: unknown) {
    if (err instanceof ReferenceError || err instanceof TypeError || err instanceof RangeError || err instanceof URIError) {
      return '\u274c ' + formatError(err) + '\n\nОшибка возникла при вызове ' + fnName + '(' + firstTc.args.map(a => formatValue(a)).join(', ') + ').\nПроверьте переменные и типы данных в вашем коде.';
    }
  }

  let results = '';
  let passed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const label = tc.label || (fnName + '(' + tc.args.map(a => formatValue(a)).join(', ') + ')');

    try {
      const argsJson = JSON.stringify(tc.args);
      const wrapper = new Function(code + '\nreturn ' + fnName + '.apply(null, ' + argsJson + ');');
      const res = wrapper();

      if (deepEqual(res, tc.expected)) {
        results += '\u2713 Тест ' + (i + 1) + ': ' + label + ' \u2192 ' + formatValue(res) + ' — Пройден\n';
        passed++;
      } else {
        results += '\u2717 Тест ' + (i + 1) + ': ' + label + ' \u2192 ' + formatValue(res) + ' (ожидалось ' + formatValue(tc.expected) + ') — Провален\n';
      }
    } catch (err: unknown) {
      results += '\u2717 Тест ' + (i + 1) + ': ' + label + ' — ' + formatError(err) + '\n';
    }
  }

  if (passed === testCases.length) {
    results += '\nВсе тесты пройдены! 🎉 (' + passed + '/' + testCases.length + ')';
  } else {
    results += '\nПройдено ' + passed + ' из ' + testCases.length + ' тестов.';
  }

  return results;
}
