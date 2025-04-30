
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    // التمرير إلى قسم المحادثة
    const chatSection = document.querySelector('#chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-roblox-darkblue text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="animate-pulse-glow rounded-full bg-roblox-blue w-8 h-8 mr-3"></div>
          <h1 className="text-2xl font-bold font-arabic">مولد سكربتات Roblox الذكي</h1>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-roblox-blue hover:text-white font-arabic"
          >
            تسجيل الدخول
          </Button>
          <Button 
            className="bg-roblox-red hover:bg-red-700 text-white font-arabic"
            onClick={handleStartFree}
          >
            إنشاء حساب
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
