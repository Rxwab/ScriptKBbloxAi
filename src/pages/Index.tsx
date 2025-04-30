
import React from 'react';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-roblox-darkblue to-roblox-blue py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-arabic text-right">
                  مولد سكربتات <span className="text-yellow-300">الذكاء الاصطناعي</span> الأول لألعاب Roblox
                </h2>
                <p className="text-white/90 text-lg mb-8 font-arabic text-right">
                  استخدم قوة الذكاء الاصطناعي لإنشاء سكربتات Lua وهاكات دالتا لألعاب Roblox الخاصة بك. يبحث نظامنا تلقائيًا في الإنترنت لتوفير أكواد محدثة ومتطورة.
                </p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-roblox-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors animate-pulse-glow font-arabic"
                  >
                    ابدأ الآن مجانًا
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <Card className="bg-white/10 backdrop-blur border-none shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-zinc-900 text-gray-300 p-4 font-mono code-block overflow-hidden">
                      <pre>
                        <code className="text-sm">
{`-- مثال لسكربت Roblox تم إنشاؤه بواسطة الذكاء الاصطناعي
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- إنشاء حدث للتواصل بين الخادم والعميل
local GiveCoins = ReplicatedStorage:FindFirstChild("GiveCoins") 
    or Instance.new("RemoteEvent")
GiveCoins.Name = "GiveCoins"
GiveCoins.Parent = ReplicatedStorage

-- إضافة عملات عندما يلمس اللاعب كائنًا
local function setupCoinParts()
    for _, coin in pairs(workspace:GetDescendants()) do
        if coin.Name == "CoinPart" and coin:IsA("BasePart") then
            coin.Touched:Connect(function(hit)
                local character = hit.Parent
                local player = Players:GetPlayerFromCharacter(character)
                
                if player then
                    GiveCoins:FireClient(player, 10)
                    coin.Transparency = 1
                    coin.CanCollide = false
                    
                    -- إظهار الكائن مرة أخرى بعد 5 ثوانٍ
                    task.delay(5, function()
                        coin.Transparency = 0
                        coin.CanCollide = true
                    end)
                end
            end)
        end
    end
end

setupCoinParts()
print("تم تحميل نظام العملات بنجاح!")`}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center font-arabic">مميزات المنصة</h2>
            <Features />
          </div>
        </section>
        
        {/* Chat Interface Section */}
        <section id="chat-section" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center font-arabic">جرب المنصة الآن</h2>
            <p className="text-gray-600 mb-12 text-center font-arabic">اكتب طلبك في الشات وسيقوم الذكاء الاصطناعي بإنشاء سكربت مخصص لك مع البحث في أحدث المصادر</p>
            <ChatInterface />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center font-arabic">آراء المستخدمين</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "أحمد خالد",
                  role: "مطور ألعاب",
                  testimonial: "هذه المنصة غيرت طريقة تطويري للألعاب في Roblox. الأكواد دقيقة وسهلة التنفيذ ووفرت علي الكثير من الوقت!",
                },
                {
                  name: "سارة محمد",
                  role: "محتوى رقمي",
                  testimonial: "كمبتدئة في البرمجة، ساعدتني هذه المنصة على فهم أساسيات Lua وتنفيذ أفكاري بسرعة. شكراً لكم!",
                },
                {
                  name: "عمر إبراهيم",
                  role: "مصمم ألعاب",
                  testimonial: "الهاكات التي يوفرها الموقع مفيدة جداً لاختبار الثغرات في ألعابي، مما ساعدني على تحسينها قبل النشر.",
                },
              ].map((item, index) => (
                <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-roblox-blue flex items-center justify-center text-white font-bold">
                        {item.name[0]}
                      </div>
                      <div className="mr-3">
                        <h3 className="font-bold font-arabic">{item.name}</h3>
                        <p className="text-gray-600 text-sm font-arabic">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 font-arabic text-right">{item.testimonial}</p>
                    <div className="mt-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
