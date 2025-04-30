import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeDisplay from './CodeDisplay';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  code?: string;
  explanation?: string;
};

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحبًا! أنا مساعدك لإنشاء سكربتات Lua وهاكات دالتا لألعاب Roblox. أستطيع البحث في الإنترنت وتقديم أحدث الحلول. كيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substring(2, 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Add user message
    const newUserMessage: Message = {
      id: generateId(),
      text: message,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setMessage('');
    setIsProcessing(true);

    // Simulate AI response with internet knowledge
    setTimeout(() => {
      let botResponse: Message;

      // معالجة الطلبات المختلفة بناءً على محتوى الرسالة
      if (message.toLowerCase().includes('نظام عملات') || message.toLowerCase().includes('اقتصادي')) {
        botResponse = {
          id: generateId(),
          text: 'بعد البحث في أحدث مصادر Roblox، إليك سكربت لنظام العملات الداخلي في اللعبة:',
          sender: 'bot',
          code: `-- نظام العملات الداخلي
local DataStoreService = game:GetService("DataStoreService")
local CurrencyStore = DataStoreService:GetDataStore("PlayerCurrency")

local function setupCurrency(player)
    local userId = player.UserId
    local success, data = pcall(function()
        return CurrencyStore:GetAsync(userId)
    end)
    
    local currency = 0
    if success and data then
        currency = data
    end
    
    -- Create a value to store the currency
    local currencyValue = Instance.new("IntValue")
    currencyValue.Name = "Currency"
    currencyValue.Value = currency
    currencyValue.Parent = player
    
    -- Save currency when changed
    currencyValue.Changed:Connect(function(newValue)
        pcall(function()
            CurrencyStore:SetAsync(userId, newValue)
        end)
    end)
end

-- Connect events
game.Players.PlayerAdded:Connect(setupCurrency)

-- Function to add currency
function addCurrency(player, amount)
    if player and player:FindFirstChild("Currency") then
        player.Currency.Value = player.Currency.Value + amount
        return true
    end
    return false
end

-- Function to remove currency
function removeCurrency(player, amount)
    if player and player:FindFirstChild("Currency") then
        if player.Currency.Value >= amount then
            player.Currency.Value = player.Currency.Value - amount
            return true
        end
    end
    return false
end`,
          explanation: 'هذا السكربت ينشئ نظام عملات كامل للعبة Roblox استناداً إلى أحدث ممارسات البرمجة. يستخدم DataStore للحفظ التلقائي للعملات، ويتضمن وظائف لإضافة وإزالة العملات. تم تحديثه ليعمل مع أحدث إصدار من Roblox.',
        };
      } else if (message.toLowerCase().includes('هاك دالتا') || message.toLowerCase().includes('hack')) {
        botResponse = {
          id: generateId(),
          text: 'وجدت لك أحدث هاك دالتا يمكنه اكتشاف وفتح جميع الأبواب في اللعبة:',
          sender: 'bot',
          code: `-- هاك دالتا لفتح جميع الأبواب (تم التحديث في 2025)
-- تنبيه: استخدم هذا الكود للتعلم فقط

local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local doors = {}

-- البحث عن الأبواب في اللعبة باستخدام خوارزمية تحليل متقدمة
for _, object in pairs(workspace:GetDescendants()) do
    if object.Name:lower():find("door") or object:FindFirstChild("Door") or 
       object.Name:lower():find("باب") or object:FindFirstChild("Entrance") then
        table.insert(doors, object)
    end
end

-- إضافة تأثيرات مرئية لتسهيل تحديد الأبواب
local function highlightDoors()
    for _, door in pairs(doors) do
        local highlight = Instance.new("Highlight")
        highlight.FillTransparency = 0.5
        highlight.FillColor = Color3.fromRGB(0, 255, 0)
        highlight.OutlineColor = Color3.fromRGB(0, 255, 0)
        highlight.Parent = door
    end
end

-- فتح جميع الأبواب المكتشفة
local function openAllDoors()
    for _, door in pairs(doors) do
        local success, err = pcall(function()
            -- محاولة تشغيل تابع الفتح إذا وجد
            if typeof(door.Open) == "function" then
                door:Open()
            -- محاولة استدعاء حدث الخادم إذا وجد
            elseif door:FindFirstChild("Open") and typeof(door.Open.FireServer) == "function" then
                door.Open:FireServer()
            -- تحريك الباب إذا كان نموذجاً
            elseif door:IsA("Model") and door.PrimaryPart then
                door:SetPrimaryPartCFrame(door:GetPrimaryPartCFrame() * CFrame.new(0, 10, 0))
            -- تغيير خصائص الباب إذا كان جزءاً أساسياً
            elseif door:IsA("BasePart") then
                door.CanCollide = false
                door.Transparency = 1
            end
        end)
        
        if not success then
            print("فشل فتح الباب: " .. door:GetFullName())
        end
    end
    
    print("تم العثور على " .. #doors .. " باب ومحاولة فتحها")
end

-- إضافة واجهة مستخدم بسيطة
local screenGui = Instance.new("ScreenGui")
screenGui.Parent = LocalPlayer.PlayerGui

local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 150, 0, 100)
frame.Position = UDim2.new(0.8, 0, 0.1, 0)
frame.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
frame.BorderSizePixel = 2
frame.BorderColor3 = Color3.fromRGB(0, 120, 215)
frame.Parent = screenGui

local openButton = Instance.new("TextButton")
openButton.Size = UDim2.new(0.8, 0, 0.4, 0)
openButton.Position = UDim2.new(0.1, 0, 0.1, 0)
openButton.Text = "فتح الأبواب"
openButton.BackgroundColor3 = Color3.fromRGB(0, 120, 215)
openButton.TextColor3 = Color3.fromRGB(255, 255, 255)
openButton.Parent = frame
openButton.MouseButton1Click:Connect(openAllDoors)

local highlightButton = Instance.new("TextButton")
highlightButton.Size = UDim2.new(0.8, 0, 0.4, 0)
highlightButton.Position = UDim2.new(0.1, 0, 0.55, 0)
highlightButton.Text = "تحديد الأبواب"
highlightButton.BackgroundColor3 = Color3.fromRGB(0, 180, 0)
highlightButton.TextColor3 = Color3.fromRGB(255, 255, 255)
highlightButton.Parent = frame
highlightButton.MouseButton1Click:Connect(highlightDoors)

-- إضافة اختصار لوحة المفاتيح
local UserInputService = game:GetService("UserInputService")
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if not gameProcessed and input.KeyCode == Enum.KeyCode.F then
        openAllDoors()
    elseif not gameProcessed and input.KeyCode == Enum.KeyCode.H then
        highlightDoors()
    end
end)

print("تم تحميل الهاك! اضغط F لفتح الأبواب أو H لتحديدها")`,
          explanation: 'هذا الهاك مطور اعتمادًا على أحدث تقنيات Roblox لعام 2025. يقوم بالبحث عن جميع الأبواب في اللعبة باستخدام خوارزمية تحليل متقدمة تتعرف على الأبواب بمختلف أنواعها، ويوفر واجهة مستخدم مع خيارات لفتح الأبواب وتحديدها بصريًا. استخدم زر F لفتح الأبواب أو زر H لتحديدها.',
        };
      } else if (message.toLowerCase().includes('باب') || message.toLowerCase().includes('فتح')) {
        botResponse = {
          id: generateId(),
          text: 'بناءً على أحدث تقنيات Roblox، إليك سكربت لإنشاء زر يفتح باب:',
          sender: 'bot',
          code: `-- سكربت فتح الباب عند الضغط على الزر
-- ضع هذا السكربت في زر داخل اللعبة

local button = script.Parent -- الزر
local door = game.Workspace.Door -- الباب (غير اسم "Door" إلى اسم الباب في اللعبة)

-- إعدادات قابلة للتخصيص
local doorOpenTime = 3 -- الوقت الذي يبقى فيه الباب مفتوحًا (بالثواني)
local doorSpeed = 1 -- سرعة حركة الباب (1 = عادي)
local soundEnabled = true -- تفعيل/تعطيل الأصوات

-- إنشاء الأصوات (اختياري)
local openSound
local closeSound

if soundEnabled then
    openSound = Instance.new("Sound")
    openSound.SoundId = "rbxassetid://142376088" -- غير هذا الرقم إلى معرف الصوت الذي تريده
    openSound.Volume = 0.5
    openSound.Parent = door
    
    closeSound = Instance.new("Sound")
    closeSound.SoundId = "rbxassetid://142376088" -- غير هذا الرقم إلى معرف الصوت الذي تريده
    closeSound.Volume = 0.5
    closeSound.Parent = door
end

-- حالة الباب
local open = false
local debounce = false
local moving = false

-- دالة تحريك الباب تدريجيًا
local function moveDoorGradually(targetCFrame, isOpening)
    moving = true
    
    -- تشغيل الصوت المناسب
    if soundEnabled then
        if isOpening then
            openSound:Play()
        else
            closeSound:Play()
        end
    end
    
    -- احصل على الموضع الأصلي للباب
    local startCFrame = door:GetPrimaryPartCFrame()
    local startTime = tick()
    local journeyLength = (targetCFrame.Position - startCFrame.Position).Magnitude
    
    -- حلقة لتحريك الباب بسلاسة
    while moving do
        local currentTime = tick() - startTime
        local journeyFraction = math.min(currentTime * doorSpeed / journeyLength, 1)
        
        door:SetPrimaryPartCFrame(startCFrame:Lerp(targetCFrame, journeyFraction))
        
        if journeyFraction >= 1 then
            moving = false
        end
        
        wait()
    end
end

-- دالة لفتح وإغلاق الباب
local function toggleDoor()
    if debounce then return end -- تجنب الضغط المتكرر
    debounce = true
    
    if not open then
        -- فتح الباب
        local targetCFrame = door:GetPrimaryPartCFrame() * CFrame.new(0, 7, 0)
        moveDoorGradually(targetCFrame, true)
        open = true
        
        -- إغلاق الباب بعد مدة زمنية
        wait(doorOpenTime)
        if open then
            local originalCFrame = door:GetPrimaryPartCFrame() * CFrame.new(0, -7, 0)
            moveDoorGradually(originalCFrame, false)
            open = false
        end
    else
        -- إغلاق الباب
        local targetCFrame = door:GetPrimaryPartCFrame() * CFrame.new(0, -7, 0)
        moveDoorGradually(targetCFrame, false)
        open = false
    end
    
    wait(0.5) -- انتظر قبل السماح بالضغط مرة أخرى
    debounce = false
end

-- إضافة إضاءة للزر لجعله أكثر وضوحًا
local light = Instance.new("PointLight")
light.Range = 5
light.Brightness = 1
light.Color = Color3.fromRGB(0, 255, 0) -- لون أخضر للدلالة على أن الزر جاهز
light.Parent = button

-- إضافة نص فوق الزر
local labelGui = Instance.new("BillboardGui")
labelGui.Size = UDim2.new(0, 100, 0, 30)
labelGui.StudsOffset = Vector3.new(0, 2, 0)
labelGui.Adornee = button
labelGui.Parent = button

local label = Instance.new("TextLabel")
label.Size = UDim2.new(1, 0, 1, 0)
label.BackgroundTransparency = 1
label.TextStrokeTransparency = 0
label.TextStrokeColor3 = Color3.new(0, 0, 0)
label.TextColor3 = Color3.new(1, 1, 1)
label.Text = "اضغط للفتح"
label.Font = Enum.Font.SourceSansBold
label.TextScaled = true
label.Parent = labelGui

-- ربط الحدث بالنقر على الزر
button.ClickDetector.MouseClick:Connect(toggleDoor)`,
          explanation: 'هذا السكربت متطور ومحدّث لعام 2025 يقوم بإنشاء زر متقدم لفتح وإغلاق الأبواب. يتميز بحركة سلسة للأبواب، وتأثيرات صوتية، وإضاءة للزر، ونص توضيحي. يمكنك تخصيص وقت فتح الباب، وسرعة الحركة، وتفعيل/تعطيل الأصوات حسب احتياجاتك.',
        };
      } else {
        botResponse = {
          id: generateId(),
          text: 'أبحث في الإنترنت عن معلومات حول هذا الموضوع... يمكنني مساعدتك في إنشاء هذا السكربت. هل يمكنك تقديم مزيد من التفاصيل عن ما تحتاجه بالضبط؟ مثلاً: هل تريد سكربت لنظام معين؟ هل تحتاج إلى هاك دالتا لوظيفة محددة؟',
          sender: 'bot',
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ الكود إلى الحافظة",
      duration: 3000,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <Card className="p-4 h-[70vh] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${
                  msg.sender === 'user'
                    ? 'text-right rtl'
                    : 'text-right rtl'
                }`}
              >
                <div
                  className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-roblox-blue text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="font-arabic">{msg.text}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="text-right">
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب طلبك هنا..."
              className="font-arabic text-right"
              dir="rtl"
            />
            <Button type="submit" className="bg-roblox-blue hover:bg-roblox-darkblue button-glow">
              إرسال
            </Button>
          </form>
        </Card>
      </div>
      <div className="lg:col-span-4">
        <Card className="p-4 h-[70vh] flex flex-col">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <TabsList className="mb-4 w-full grid grid-cols-2">
              <TabsTrigger value="code" className="font-arabic">الكود</TabsTrigger>
              <TabsTrigger value="explanation" className="font-arabic">الشرح</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="flex-1 overflow-y-auto">
              {messages.find((m) => m.code) ? (
                <CodeDisplay 
                  code={messages.find((m) => m.code)?.code || ''} 
                  onCopy={handleCopyCode} 
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p className="font-arabic text-center">اطلب أي سكربت وسيظهر الكود هنا</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="explanation" className="font-arabic rtl flex-1 overflow-y-auto">
              {messages.find((m) => m.explanation) ? (
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">شرح الكود:</h3>
                  <p>{messages.find((m) => m.explanation)?.explanation}</p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p className="text-center">اطلب أي سكربت وسيظهر شرح الكود هنا</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
