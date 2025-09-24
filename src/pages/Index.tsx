import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface LayerState {
  mainChannels: boolean;
  pipes: boolean;
  sluices: boolean;
  parcels: boolean;
}

const Index: React.FC = () => {
  const [layers, setLayers] = useState<LayerState>({
    mainChannels: true,
    pipes: true,
    sluices: true,
    parcels: true,
  });

  const toggleLayer = (layer: keyof LayerState) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black mb-2">СХЕМА ОРОСИТЕЛЬНОЙ СИСТЕМЫ</h1>
          <p className="text-sm text-gray-700">Участок № 1 • Масштаб 1:1000 • М 1:1000</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Main Drawing Area */}
        <div className="flex-1">
          <div className="bg-white border-2 border-gray-800 aspect-[4/3] relative">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
            >
              {/* North Arrow */}
              <g transform="translate(50, 50)">
                <path d="M 0 -15 L -6 6 L 0 3 L 6 6 Z" fill="black" strokeWidth="1" stroke="black"/>
                <text x="-3" y="20" className="text-xs font-mono" fill="black">С</text>
              </g>

              {/* Main Canal - Horizontal line at top */}
              {layers.mainChannels && (
                <>
                  <line x1="100" y1="120" x2="700" y2="120" stroke="black" strokeWidth="3" />
                  <text x="350" y="110" className="text-xs font-mono" fill="black">Магистральный канал</text>
                </>
              )}

              {/* Parcels - Linear layout like in the reference */}
              {layers.parcels && (
                <>
                  {/* Left side parcels */}
                  <g>
                    <line x1="150" y1="120" x2="150" y2="500" stroke="black" strokeWidth="2" />
                    
                    {/* Horizontal divisions */}
                    <line x1="100" y1="160" x2="150" y2="160" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="200" x2="150" y2="200" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="240" x2="150" y2="240" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="280" x2="150" y2="280" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="320" x2="150" y2="320" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="360" x2="150" y2="360" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="400" x2="150" y2="400" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="440" x2="150" y2="440" stroke="black" strokeWidth="1" />
                    <line x1="100" y1="480" x2="150" y2="480" stroke="black" strokeWidth="1" />
                    
                    {/* Left border */}
                    <line x1="100" y1="120" x2="100" y2="500" stroke="black" strokeWidth="2" />
                    <line x1="100" y1="500" x2="150" y2="500" stroke="black" strokeWidth="2" />
                    
                    {/* Parcel numbers - left side */}
                    <text x="115" y="145" className="text-xs font-mono" fill="black">1</text>
                    <text x="115" y="185" className="text-xs font-mono" fill="black">2</text>
                    <text x="115" y="225" className="text-xs font-mono" fill="black">3</text>
                    <text x="115" y="265" className="text-xs font-mono" fill="black">4</text>
                    <text x="115" y="305" className="text-xs font-mono" fill="black">5</text>
                    <text x="115" y="345" className="text-xs font-mono" fill="black">6</text>
                    <text x="115" y="385" className="text-xs font-mono" fill="black">7</text>
                    <text x="115" y="425" className="text-xs font-mono" fill="black">8</text>
                    <text x="115" y="465" className="text-xs font-mono" fill="black">9</text>
                  </g>

                  {/* Right side parcels - angled like in reference */}
                  <g>
                    {/* Main right line */}
                    <line x1="500" y1="120" x2="620" y2="350" stroke="black" strokeWidth="2" />
                    
                    {/* Angled divisions */}
                    <line x1="500" y1="120" x2="580" y2="140" stroke="black" strokeWidth="1" />
                    <line x1="510" y1="140" x2="590" y2="160" stroke="black" strokeWidth="1" />
                    <line x1="520" y1="160" x2="600" y2="180" stroke="black" strokeWidth="1" />
                    <line x1="530" y1="180" x2="610" y2="200" stroke="black" strokeWidth="1" />
                    <line x1="540" y1="200" x2="620" y2="220" stroke="black" strokeWidth="1" />
                    <line x1="550" y1="220" x2="630" y2="240" stroke="black" strokeWidth="1" />
                    <line x1="560" y1="240" x2="640" y2="260" stroke="black" strokeWidth="1" />
                    <line x1="570" y1="260" x2="650" y2="280" stroke="black" strokeWidth="1" />
                    <line x1="580" y1="280" x2="660" y2="300" stroke="black" strokeWidth="1" />
                    <line x1="590" y1="300" x2="670" y2="320" stroke="black" strokeWidth="1" />
                    <line x1="600" y1="320" x2="680" y2="340" stroke="black" strokeWidth="1" />
                    
                    {/* Connecting lines */}
                    <line x1="580" y1="140" x2="680" y2="340" stroke="black" strokeWidth="2" />
                    
                    {/* Square block in corner */}
                    <rect x="620" y="350" width="60" height="60" fill="none" stroke="black" strokeWidth="2" />
                    <line x1="640" y1="350" x2="640" y2="410" stroke="black" strokeWidth="1" />
                    <line x1="660" y1="350" x2="660" y2="410" stroke="black" strokeWidth="1" />
                    
                    {/* Parcel numbers - right side */}
                    <text x="530" y="135" className="text-xs font-mono" fill="black">10</text>
                    <text x="540" y="155" className="text-xs font-mono" fill="black">11</text>
                    <text x="550" y="175" className="text-xs font-mono" fill="black">12</text>
                    <text x="560" y="195" className="text-xs font-mono" fill="black">13</text>
                    <text x="570" y="215" className="text-xs font-mono" fill="black">14</text>
                    <text x="580" y="235" className="text-xs font-mono" fill="black">15</text>
                    <text x="590" y="255" className="text-xs font-mono" fill="black">16</text>
                    <text x="635" y="375" className="text-xs font-mono" fill="black">17</text>
                    <text x="655" y="375" className="text-xs font-mono" fill="black">18</text>
                  </g>
                </>
              )}

              {/* Sluices - dots at connection points */}
              {layers.sluices && (
                <>
                  <circle cx="150" cy="120" r="4" fill="black" />
                  <circle cx="200" cy="120" r="4" fill="black" />
                  <circle cx="300" cy="120" r="4" fill="black" />
                  <circle cx="400" cy="120" r="4" fill="black" />
                  <circle cx="500" cy="120" r="4" fill="black" />
                  <circle cx="600" cy="120" r="4" fill="black" />
                </>
              )}

              {/* Pipes/connections */}
              {layers.pipes && (
                <>
                  {/* Vertical connections from main canal to parcels */}
                  <line x1="200" y1="120" x2="200" y2="180" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="300" y1="120" x2="300" y2="180" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="400" y1="120" x2="400" y2="180" stroke="black" strokeWidth="1" strokeDasharray="3,3" />
                </>
              )}

              {/* Scale */}
              <g transform="translate(600, 550)">
                <line x1="0" y1="0" x2="60" y2="0" stroke="black" strokeWidth="2" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="black" strokeWidth="1" />
                <line x1="60" y1="-3" x2="60" y2="3" stroke="black" strokeWidth="1" />
                <text x="15" y="-8" className="text-xs font-mono" fill="black">0  60м</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Panel with Legend and Controls */}
        <div className="w-80 space-y-6">
          {/* Layer Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="Layers" size={20} />
                Слои чертежа
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Магистральный канал</label>
                <Switch
                  checked={layers.mainChannels}
                  onCheckedChange={() => toggleLayer('mainChannels')}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Участки</label>
                <Switch
                  checked={layers.parcels}
                  onCheckedChange={() => toggleLayer('parcels')}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Шлюзы</label>
                <Switch
                  checked={layers.sluices}
                  onCheckedChange={() => toggleLayer('sluices')}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Трубопроводы</label>
                <Switch
                  checked={layers.pipes}
                  onCheckedChange={() => toggleLayer('pipes')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Legend */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Условные обозначения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="border-b pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-0.5 bg-black"></div>
                  <span>1. Магистральный канал</span>
                </div>
              </div>
              
              <div className="border-b pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-0.5 bg-black opacity-60" style={{borderTop: '1px dashed black'}}></div>
                  <span>2. Трубопровод</span>
                </div>
              </div>

              <div className="border-b pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-4 h-4 border border-black"></div>
                  <span>3. Межучастковый канал</span>
                </div>
              </div>

              <div className="pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span>4. Участковый канал</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="font-mono text-xs text-gray-600">
                  М 1:1000<br/>
                  Лист 1 из 1<br/>
                  Дата: {new Date().toLocaleDateString('ru-RU')}<br/>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Техническая информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm font-mono">
              <div className="flex justify-between border-b pb-1">
                <span>Общее кол-во участков:</span>
                <span>18</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Кол-во шлюзов:</span>
                <span>6</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Длина маг. канала:</span>
                <span>600 м</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Общая площадь:</span>
                <span>12.5 га</span>
              </div>
              <div className="flex justify-between">
                <span>Тип орошения:</span>
                <span>Поверхностное</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;