
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white/95 backdrop-blur shadow-lg border-t-4 border-t-roblox-blue hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="font-arabic text-right">إنشاء سكربتات Lua وهاكات دالتا</CardTitle>
        </CardHeader>
        <CardContent className="font-arabic text-right">
          <p className="text-gray-600">
            الموقع مصمم خصيصًا لإنشاء سكربتات Lua التي يمكن استخدامها في ألعاب Roblox وإنشاء "هاكات دالتا" (Hack Data) لتخصيص الألعاب أو إضافة ميزات جديدة.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur shadow-lg border-t-4 border-t-roblox-red hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="font-arabic text-right">استخراج المعلومات من الإنترنت</CardTitle>
        </CardHeader>
        <CardContent className="font-arabic text-right">
          <p className="text-gray-600">
            لا يعتمد الموقع فقط على قاعدة بيانات داخلية لإنشاء الأكواد، بل يستفيد أيضًا من الإنترنت لجمع المعلومات والأكواد الحديثة لضمان أن الأكواد المنشأة دقيقة ومحدثة.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur shadow-lg border-t-4 border-t-roblox-darkblue hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="font-arabic text-right">تكامل مع الذكاء الاصطناعي</CardTitle>
        </CardHeader>
        <CardContent className="font-arabic text-right">
          <p className="text-gray-600">
            يعمل بوت الذكاء الاصطناعي على تحليل البيانات التي يتم جمعها من الإنترنت وتحويلها إلى أكواد قابلة للتنفيذ مع تحسينها تلقائيًا لضمان كفاءتها العالية.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Features;
