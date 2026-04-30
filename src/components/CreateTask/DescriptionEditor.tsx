import { FileText, Code, Image as ImageIcon } from 'lucide-react';

interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DescriptionEditor({ value, onChange }: DescriptionEditorProps) {
  return (
    <div className="bg-charcoal-light p-8 rounded-lg border border-border shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText className="text-primary bg-primary/10 p-2 rounded" size={36} />
          <h3 className="text-xl font-bold text-text-primary tracking-tight uppercase font-sans">
            Условие задачи
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-charcoal p-1 rounded border border-border">
          <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted font-serif font-bold italic" title="Italic">I</button>
          <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted font-sans font-bold" title="Bold">B</button>
          <div className="w-px h-4 bg-border mx-1"></div>
          <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted" title="Code"><Code size={18} /></button>
          <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted" title="Image"><ImageIcon size={18} /></button>
        </div>
      </div>
      <textarea
        className="w-full min-h-[300px] rounded-lg border border-border bg-charcoal text-text-primary p-5 focus:ring-1 focus:ring-primary focus:border-transparent transition-all placeholder:text-text-muted/50 font-mono text-sm leading-relaxed outline-none resize-y"
        placeholder="Введите текст задания используя Markdown..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
}
