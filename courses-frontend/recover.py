import json
import glob
import os

# Step 2: Recover files from transcript
with open(r'C:\Users\User\.gemini\antigravity-ide\brain\50d5af86-6898-4391-b8ad-d669a592a4b1\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if 'tool_calls' in data:
            for call in data['tool_calls']:
                if call['name'] == 'write_to_file' and 'CodeContent' in call['args']:
                    file_path = call['args']['TargetFile']
                    code_content = call['args']['CodeContent']
                    with open(file_path, 'w', encoding='utf-8') as out:
                        out.write(code_content)

# Step 3: Replace colors safely
files = glob.glob(r'c:\Users\User\Desktop\PAMHO\courses-frontend\src\**\*.tsx', recursive=True)
files.append(r'c:\Users\User\Desktop\PAMHO\courses-frontend\src\index.css')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace colors
    content = content.replace('#C0472A', '#815dd7')
    content = content.replace('bg-[#121413]', 'bg-[#1a112c]')
    content = content.replace('border-[#121413]', 'border-[#1a112c]')
    
    # Custom fixes
    content = content.replace('<h3 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-12">', '<h3 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-12 text-[#FDFBF7]">')
    content = content.replace('<span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-[#121413]">PAMHO.</span>', '<img src="/pamho-logo.png" alt="PAMHO" className="h-8 md:h-10 w-auto" />')
    content = content.replace('<span className="font-serif text-3xl font-bold tracking-tight">PAMHO.</span>', '<img src="/pamho-logo.png" alt="PAMHO" className="h-10 w-auto" />')
    content = content.replace('about_hero.png', 'advocacy_group.png')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
