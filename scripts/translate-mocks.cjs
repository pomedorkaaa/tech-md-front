const fs = require('fs');
const path = require('path');

const filePaths = [
  'src/pages/Companies/CompaniesMockData.json',
  'src/pages/CompanyOverview/CompanyOverviewMockData.json',
  'src/pages/Home/HomeMockData.json',
  'src/pages/Jobs/JobsMockData.json',
  'src/pages/Sandbox/SandboxMockData.json',
];

const dictEN = {
  'Кишинёв': 'Chisinau',
  'Молдова': 'Moldova',
  'разработчик': 'developer',
  'Разработчик': 'Developer',
  'Опыт работы': 'Experience',
  'Гибкий график работы': 'Flexible hours',
  'Медицинская страховка': 'Health insurance',
  'Новичок': 'Junior',
  'Профессионал': 'Senior',
  'Специалист': 'Middle',
  'Инновационная IT-компания': 'Innovative IT company',
  'Опыт': 'Experience',
  'лет': 'years',
  'Мы ищем': 'We are looking for',
  'Описание': 'Description',
};

const dictRO = {
  'Кишинёв': 'Chișinău',
  'Молдова': 'Moldova',
  'разработчик': 'dezvoltator',
  'Разработчик': 'Dezvoltator',
  'Опыт работы': 'Experiență',
  'Гибкий график работы': 'Program flexibil',
  'Медицинская страховка': 'Asigurare medicală',
  'Новичок': 'Începător',
  'Профессионал': 'Senior',
  'Специалист': 'Middle',
  'Инновационная IT-компания': 'Companie IT inovatoare',
  'Опыт': 'Experiență',
  'лет': 'ani',
  'Мы ищем': 'Căutăm',
  'Описание': 'Descriere',
};

function translateString(str, dict) {
  let res = str;
  for (const [ru, tr] of Object.entries(dict)) {
    res = res.split(ru).join(tr);
  }
  return res;
}

function translateObj(obj, dict) {
  if (typeof obj === 'string') return translateString(obj, dict);
  if (Array.isArray(obj)) return obj.map(item => translateObj(item, dict));
  if (typeof obj === 'object' && obj !== null) {
    const res = {};
    for (const key in obj) {
      res[key] = translateObj(obj[key], dict);
    }
    return res;
  }
  return obj;
}

const outDir = 'src/data/locales';
fs.mkdirSync(path.join(outDir, 'ru'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'en'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'ro'), { recursive: true });

filePaths.forEach(p => {
  if (!fs.existsSync(p)) return;
  const name = path.basename(p);
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  
  // Save RU
  fs.writeFileSync(path.join(outDir, 'ru', name), JSON.stringify(data, null, 2));
  
  // Save EN
  const enData = translateObj(data, dictEN);
  fs.writeFileSync(path.join(outDir, 'en', name), JSON.stringify(enData, null, 2));
  
  // Save RO
  const roData = translateObj(data, dictRO);
  fs.writeFileSync(path.join(outDir, 'ro', name), JSON.stringify(roData, null, 2));
  
  console.log(`Processed ${name}`);
});
