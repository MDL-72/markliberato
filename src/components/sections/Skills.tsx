'use client';

import React, { useState, useEffect, useRef } from 'react';
import { skillsData } from '../../data/optimized-constants';
import Card from '../ui/Card';
import AnimatedBackground from '../common/AnimatedBackground';
import PageHeader from '../common/PageHeader';

// Desktop Icon Component
const DesktopIcon = ({ 
  icon, 
  label, 
  onClick, 
  isSelected = false 
}: { 
  icon: string; 
  label: string; 
  onClick: () => void; 
  isSelected?: boolean;
}) => (
  <div 
    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-500/20 ${
      isSelected ? 'bg-blue-500/30' : ''
    }`}
    onClick={onClick}
  >
    <div className="text-4xl mb-1">{icon}</div>
    <span className="text-xs text-white text-center max-w-16 break-words">{label}</span>
  </div>
);

// Window Component
const Window = ({ 
  title, 
  children, 
  isOpen, 
  onClose 
}: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-4 bg-gray-800 rounded-lg shadow-2xl border border-gray-600 flex flex-col">
      {/* Window Header */}
      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-t-lg border-b border-gray-600">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" onClick={onClose}></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-white text-sm font-medium ml-2">{title}</span>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

// Skills Explorer Component
const SkillsExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<'categories' | 'skills'>('categories');

  const getSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: string } = {
      // Frontend
      'React': '⚛️',
      'Next.js': '▲',
      'TypeScript': '🔷',
      'JavaScript': '🟨',
      'Angular': '🅰️',
      
      // Styling
      'Tailwind CSS': '🎨',
      'Material UI': '🧩',
      'shadcn/ui': '🎯',
      'BEM': '📦',
      'SCSS': '💎',
      'CSS3': '🎨',
      'HTML5': '🌐',
      
      // State Management
      'Redux': '🔄',
      'Redux Toolkit': '🛠️',
      'Zustand': '🐻',
      'Context API': '📡',
      
      // Testing
      'React Testing Library': '🧪',
      'Jest': '🎯',
      'Karma': '⚡',
      'Jasmine': '🌸',
      
      // Tools
      'GitHub Actions': '⚙️',
      'AWS': '☁️',
      'Vercel': '▲',
      'Docker': '🐳',
      
      // Languages
      'Java': '☕',
      'Python': '🐍',
      'SQL': '🗄️',
      'C#': '🔷',
      'C++': '⚡',
      
      // Data
      'DAG (Airflow)': '🌪️',
      'Data Visualization': '📊',
      'ETL': '🔄'
    };
    
    return iconMap[skillName] || '📄';
  };

  const getSkillDetails = (categoryKey: string) => {
    const category = skillsData[categoryKey as keyof typeof skillsData];
    if (!category) return [];

    return category.skills.map(skill => {
      if (typeof skill === 'string') {
        return { name: skill, level: 'Proficient', icon: getSkillIcon(skill) };
      } else {
        return { 
          name: (skill as any).name, 
          level: `${(skill as any).level}%`,
          icon: getSkillIcon((skill as any).name)
        };
      }
    });
  };

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setView('skills');
  };

  const handleBackClick = () => {
    setView('categories');
    setSelectedCategory(null);
  };

  if (view === 'skills' && selectedCategory) {
    const category = skillsData[selectedCategory as keyof typeof skillsData];
    const skills = getSkillDetails(selectedCategory);
    
    return (
      <div className="h-full">
        {/* File Manager Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-600">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="text-lg">←</div>
            <span>Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-2xl">📁</div>
            <div>
              <h3 className="text-white font-medium text-lg">{category.title}</h3>
              <div className="text-gray-400 text-sm">{skills.length} files</div>
            </div>
          </div>
        </div>

        {/* File Manager Toolbar */}
        <div className="mb-4 p-2 bg-gray-700/50 rounded border border-gray-600">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <span>📄</span>
              <span>View: Files</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>📊</span>
              <span>{skills.length} files</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>📁</span>
              <span>Folder: {category.title}</span>
            </div>
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors duration-200 border border-gray-600 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  {skill.icon}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors truncate">
                    {skill.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    Level: {skill.level}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-16 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ 
                        width: skill.level === 'Proficient' 
                          ? '85%' 
                          : skill.level.replace('%', '') + '%' 
                      }}
                    />
                  </div>
                  <span className="text-cyan-400 text-xs font-bold w-12 text-right whitespace-nowrap">
                    {skill.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* File Manager Footer */}
        <div className="mt-6 p-3 bg-gray-800/50 rounded border border-gray-600">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span>📁 {category.title}</span>
              <span>•</span>
              <span>Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📄</span>
              <span>{skills.length} files</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* File Manager Header */}
      <div className="mb-4 pb-3 border-b border-gray-600">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl">📁</div>
          <h3 className="text-white font-medium text-lg">Skills Explorer</h3>
        </div>
        <p className="text-gray-400 text-sm">Double-click folders to explore skills</p>
      </div>

      {/* File Manager Toolbar */}
      <div className="mb-4 p-2 bg-gray-700/50 rounded border border-gray-600">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <span>📁</span>
            <span>View: Folders</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span>📊</span>
            <span>{Object.keys(skillsData).length} folders</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span>⚡</span>
            <span>{Object.values(skillsData).reduce((acc, category) => acc + category.skills.length, 0)} skills</span>
          </div>
        </div>
      </div>
      
      {/* Folder Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Object.entries(skillsData).map(([key, data]) => (
          <div 
            key={key}
            className="group p-4 rounded-lg cursor-pointer transition-all duration-200 border border-gray-600 hover:border-cyan-400 bg-gray-700/30 hover:bg-gray-600/50 hover:shadow-lg hover:shadow-cyan-400/20"
            onDoubleClick={() => handleCategoryClick(key)}
            onClick={() => handleCategoryClick(key)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                📁
              </div>
              <div className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors mb-1">
                {data.title}
              </div>
              <div className="text-gray-400 text-xs">
                {data.skills.length} items
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Double-click to open
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* File Manager Footer */}
      <div className="mt-6 p-3 bg-gray-800/50 rounded border border-gray-600">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span>📁 Skills Explorer</span>
            <span>•</span>
            <span>Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span>{Object.keys(skillsData).length} folders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Terminal Component
const Terminal = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    'help': () => [
      'Available commands:',
      '  help          - Show this help message',
      '  skills        - Display all skill categories',
      '  frontend      - Show frontend technologies',
      '  styling       - Show styling technologies', 
      '  state         - Show state management tools',
      '  testing       - Show testing frameworks',
      '  tools         - Show development tools',
      '  languages     - Show programming languages',
      '  data          - Show data technologies',
      '  stats         - Show skill statistics',
      '  clear         - Clear terminal',
      '',
      'Type any command and press Enter to execute.'
    ],
    'skills': () => [
      'Skill Categories:',
      ...Object.entries(skillsData).map(([key, data], index) => 
        `  ${index + 1}. ${data.title} (${data.skills.length} skills)`
      ),
      '',
      'Use specific category names to see detailed skills.'
    ],
    'frontend': () => [
      'Frontend Technologies:',
      ...skillsData.frontend.skills.map(skill => 
        `  • ${skill.name} - ${skill.level}% proficiency`
      )
    ],
    'styling': () => [
      'Styling Technologies:',
      ...skillsData.styling.skills.map(skill => 
        typeof skill === 'string' 
          ? `  • ${skill} - Proficient`
          : `  • ${(skill as any).name} - ${(skill as any).level}% proficiency`
      )
    ],
    'state': () => [
      'State Management:',
      ...skillsData.stateManagement.skills.map(skill => 
        typeof skill === 'string' 
          ? `  • ${skill} - Proficient`
          : `  • ${(skill as any).name} - ${(skill as any).level}% proficiency`
      )
    ],
    'testing': () => [
      'Testing Frameworks:',
      ...skillsData.testing.skills.map(skill => 
        typeof skill === 'string' 
          ? `  • ${skill} - Proficient`
          : `  • ${(skill as any).name} - ${(skill as any).level}% proficiency`
      )
    ],
    'tools': () => [
      'Development Tools:',
      ...skillsData.tools.skills.map(skill => 
        typeof skill === 'string' 
          ? `  • ${skill} - Proficient`
          : `  • ${(skill as any).name} - ${(skill as any).level}% proficiency`
      )
    ],
    'languages': () => [
      'Programming Languages:',
      ...skillsData.languages.skills.map(skill => 
        typeof skill === 'string' 
          ? `  • ${skill} - Proficient`
          : `  • ${(skill as any).name} - ${(skill as any).level}% proficiency`
      )
    ],
    'data': () => [
      'Data Technologies:',
      ...skillsData.data.skills.map(skill => 
        typeof skill === 'string' 
          ? `  • ${skill} - Proficient`
          : `  • ${(skill as any).name} - ${(skill as any).level}% proficiency`
      )
    ],
    'stats': () => {
      const totalSkills = Object.values(skillsData).reduce((acc, category) => acc + category.skills.length, 0);
      
      // Get all skills with levels (frontend and stateManagement)
      const allSkillsWithLevels = [
        ...skillsData.frontend.skills,
        ...skillsData.stateManagement.skills
      ];
      
      const expertSkills = allSkillsWithLevels.filter(skill => skill.level >= 90).length;
      const advancedSkills = allSkillsWithLevels.filter(skill => skill.level >= 80 && skill.level < 90).length;
      
      return [
        'Skill Statistics:',
        `  Total Technologies: ${totalSkills}`,
        `  Expert Level (90%+): ${expertSkills}`,
        `  Advanced Level (80-89%): ${advancedSkills}`,
        `  Categories: ${Object.keys(skillsData).length}`,
        '',
        'Proficiency Levels:',
        '  Expert (90-100%): Mastery level',
        '  Advanced (80-89%): Highly proficient',
        '  Proficient (70-79%): Good working knowledge',
        '  Intermediate (60-69%): Basic understanding'
      ];
    },
    'clear': () => []
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newOutput = [...output];
    
    // Add command to output
    newOutput.push(`$ ${cmd}`);
    
    // Execute command
    if (commands[trimmedCmd as keyof typeof commands]) {
      const result = commands[trimmedCmd as keyof typeof commands]();
      newOutput.push(...result);
    } else {
      newOutput.push(`Command not found: ${cmd}`);
      newOutput.push('Type "help" for available commands.');
    }
    
    newOutput.push(''); // Add empty line
    setOutput(newOutput);
    setCurrentCommand('');
    
    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    }
  };

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="h-full bg-black/90 rounded-lg font-mono text-sm overflow-hidden flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-700">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-xs">mark@portfolio:~$</span>
      </div>

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {output.length === 0 && (
          <div className="text-green-400 mb-4">
            <div>Welcome to Mark's Skills Terminal!</div>
            <div>Type 'help' to see available commands.</div>
            <div className="text-gray-500">Last login: Today</div>
            <div></div>
          </div>
        )}
        
        {output.map((line, index) => (
          <div 
            key={index} 
            className={`mb-1 ${
              line.startsWith('$') ? 'text-cyan-400' : 
              line.startsWith('•') ? 'text-green-400' :
              line.startsWith('  ') ? 'text-gray-300' :
              line.includes('Command not found') ? 'text-red-400' :
              'text-white'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Command Input */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-700">
        <span className="text-green-400">$</span>
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent text-white outline-none"
          placeholder="Enter command..."
          autoFocus
        />
        <div className="w-2 h-4 bg-cyan-400 animate-pulse"></div>
      </div>
    </div>
  );
};

// Computer Desktop Component
const ComputerDesktop = () => {
  const [openWindows, setOpenWindows] = useState<{ [key: string]: boolean }>({});
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const desktopIcons = [
    { id: 'skills', icon: '📁', label: 'Skills Explorer', component: SkillsExplorer },
    { id: 'terminal', icon: '💻', label: 'Terminal', component: Terminal },
    { id: 'about', icon: '👤', label: 'About Me', component: () => <div className="text-white">About information would go here</div> },
    { id: 'projects', icon: '🚀', label: 'Projects', component: () => <div className="text-white">Projects would go here</div> },
    { id: 'contact', icon: '📧', label: 'Contact', component: () => <div className="text-white">Contact information would go here</div> },
  ];

  const openWindow = (id: string) => {
    setOpenWindows(prev => ({ ...prev, [id]: true }));
    setSelectedIcon(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
    if (selectedIcon === id) {
      setSelectedIcon(null);
    }
  };

  return (
    <div className="relative w-full h-[800px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-2 gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
            isSelected={selectedIcon === icon.id}
          />
        ))}
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 p-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🪟</div>
          <div className="text-white text-sm">Mark's Portfolio Desktop</div>
          <div className="ml-auto text-white text-sm">3:16 PM</div>
        </div>
      </div>

      {/* Windows */}
      {desktopIcons.map((icon) => (
        <Window
          key={icon.id}
          title={icon.label}
          isOpen={openWindows[icon.id] || false}
          onClose={() => closeWindow(icon.id)}
        >
          <icon.component />
        </Window>
      ))}
    </div>
  );
};

const Skills: React.FC = () => {

  return (
    <section className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="skills" />

      <div className="max-w-7xl mx-auto relative z-10">
        <PageHeader 
          title="Technical Skills"
          subtitle="Interactive computer desktop showcasing my technical expertise"
          highlightText="Interactive computer desktop"
        />


        {/* Computer Desktop Interface */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 mb-8 sm:mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Interactive Computer Desktop</h3>
            <p className="text-gray-400">Click on desktop icons to explore my skills • Double-click to open applications</p>
          </div>
          
          <ComputerDesktop />
        </Card>
      </div>
    </section>
  );
};

export default Skills;