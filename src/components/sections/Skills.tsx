'use client';

import React, { useState, useEffect, useRef } from 'react';
import { skillsData } from '../../data/optimized-constants';
import Card from '../ui/Card';
import AnimatedBackground from '../common/AnimatedBackground';
import PageHeader from '../common/PageHeader';

// Terminal Component
const Terminal = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
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
    
    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    
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
    <div className="bg-black/90 rounded-lg p-4 h-96 font-mono text-sm overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
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
        className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
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
      <div className="flex items-center gap-2 mt-4">
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

const Skills: React.FC = () => {
  // Calculate statistics from skillsData
  const totalTechnologies = Object.values(skillsData).reduce((acc, category) => acc + category.skills.length, 0);
  const totalCategories = Object.keys(skillsData).length;
  
  // Get all skills with levels (frontend and stateManagement)
  const allSkillsWithLevels = [
    ...skillsData.frontend.skills,
    ...skillsData.stateManagement.skills
  ];
  
  const expertSkills = allSkillsWithLevels.filter(skill => skill.level >= 90).length;
  const advancedSkills = allSkillsWithLevels.filter(skill => skill.level >= 80 && skill.level < 90).length;
  const proficientSkills = allSkillsWithLevels.filter(skill => skill.level >= 70 && skill.level < 80).length;
  const intermediateSkills = allSkillsWithLevels.filter(skill => skill.level >= 60 && skill.level < 70).length;

  // Get top skills for display (from all skills with levels)
  const topSkills = [...allSkillsWithLevels]
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  return (
    <section className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="skills" />

      <div className="max-w-7xl mx-auto relative z-10">
        <PageHeader 
          title="Technical Skills"
          subtitle="Interactive terminal interface showcasing my technical expertise"
          highlightText="Interactive terminal interface"
        />

        {/* Skills Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 sm:mb-12">
          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{totalTechnologies}</div>
            <div className="text-xs text-gray-300">Technologies</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{totalCategories}</div>
            <div className="text-xs text-gray-300">Categories</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{expertSkills}</div>
            <div className="text-xs text-gray-300">Expert Level</div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/30 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{advancedSkills + proficientSkills}</div>
            <div className="text-xs text-gray-300">Advanced+</div>
          </Card>
        </div>

        {/* Terminal Interface */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 mb-8 sm:mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Interactive Skills Terminal</h3>
            <p className="text-gray-400">Type commands to explore my technical skills • Try 'help' to get started</p>
          </div>
          
          <Terminal />
        </Card>

        {/* Top Skills - Most Important */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 mb-8 sm:mb-12">
          <h3 className="text-lg font-bold text-white mb-6 text-center">Core Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSkills.map((skill: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-cyan-400 font-bold w-6 text-right">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Skills;