import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface LayerState {
  mainChannels: boolean;
  parcels: boolean;
  sluices: boolean;
  pipes: boolean;
}

const Index: React.FC = () => {
  const [layers, setLayers] = useState<LayerState>({
    mainChannels: true,
    parcels: true,
    sluices: true,
    pipes: true,
  });

  const toggleLayer = (layer: keyof LayerState) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-8 print:p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 print:mb-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black mb-2 print:text-xl">СХЕМА ОРОСИТЕЛЬНОЙ СИСТЕМЫ</h1>
          <p className="text-sm text-gray-700 print:text-xs">Участок № 1 • Масштаб 1:1000</p>
          <div className="mt-4 print:hidden">
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Icon name="Printer" size={20} />
              Печать схемы А4
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-8 print:block">
        {/* Main Drawing Area */}
        <div className="flex-1 print:w-full print:max-w-none">
          <div className="bg-white border-2 border-gray-800 aspect-[4/3] relative print:border-black print:aspect-[1.414/1]">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
            >
              {/* North Arrow */}
              <g transform="translate(50, 50)">
                <path d="M 0 -15 L -6 6 L 0 3 L 6 6 Z" fill="black" strokeWidth="1" stroke="black"/>
                <text x="-3" y="20" className="text-xs font-mono print:text-[10px]" fill="black">С</text>
              </g>

              {/* Main Canal - Horizontal line at top */}
              {layers.mainChannels && (
                <>
                  <line x1="120" y1="120" x2="680" y2="120" stroke="black" strokeWidth="3" />
                  <text x="350" y="110" className="text-xs font-mono print:text-[10px]" fill="black">Магистральный канал</text>
                </>
              )}

              {/* Parcels - Exact layout like in reference */}
              {layers.parcels && (
                <>
                  {/* Left side linear parcels */}
                  <g>
                    {/* Main vertical line on left */}
                    <line x1="180" y1="120" x2="180" y2="480" stroke="black" strokeWidth="2" />
                    <line x1="120" y1="120" x2="120" y2="480" stroke="black" strokeWidth="2" />
                    
                    {/* Horizontal divisions creating strips */}
                    <line x1="120" y1="160" x2="180" y2="160" stroke="black" strokeWidth="1" />
                    <line x1="120" y1="200" x2="180" y2="200" stroke="black" strokeWidth="1" />
                    <line x1="120" y1="240" x2="180" y2="240" stroke="black" strokeWidth="1" />
                    <line x1="120" y1="280" x2="180" y2="280" stroke="black" strokeWidth="1" />
                    <line x1="120" y1="320" x2="180" y2="320" stroke="black" strokeWidth="1" />
                    <line x1="120" y1="360" x2="180" y2="360" stroke="black" strokeWidth="1" />
                    <line x1="120" y1="400" x2="180" y2="400" stroke="black" strokeWidth="1" />
                    <line x1="120" y1="440" x2="180" y2="440" stroke="black" strokeWidth="1" />
                    
                    {/* Bottom closure */}
                    <line x1="120" y1="480" x2="180" y2="480" stroke="black" strokeWidth="2" />
                    
                    {/* Parcel numbers for left side */}
                    <text x="140" y="145" className="text-xs font-mono print:text-[9px]" fill="black">1</text>
                    <text x="140" y="185" className="text-xs font-mono print:text-[9px]" fill="black">2</text>
                    <text x="140" y="225" className="text-xs font-mono print:text-[9px]" fill="black">3</text>
                    <text x="140" y="265" className="text-xs font-mono print:text-[9px]" fill="black">4</text>
                    <text x="140" y="305" className="text-xs font-mono print:text-[9px]" fill="black">5</text>
                    <text x="140" y="345" className="text-xs font-mono print:text-[9px]" fill="black">6</text>
                    <text x="140" y="385" className="text-xs font-mono print:text-[9px]" fill="black">7</text>
                    <text x="140" y="425" className="text-xs font-mono print:text-[9px]" fill="black">8</text>
                    <text x="140" y="465" className="text-xs font-mono print:text-[9px]" fill="black">9</text>
                  </g>

                  {/* Right side angled parcels - matching the reference drawing */}
                  <g>
                    {/* Main angled boundary */}
                    <line x1="480" y1="120" x2="600" y2="320" stroke="black" strokeWidth="2" />
                    
                    {/* Parallel angled divisions */}
                    <line x1="480" y1="120" x2="560" y2="140" stroke="black" strokeWidth="1" />
                    <line x1="490" y1="140" x2="570" y2="160" stroke="black" strokeWidth="1" />
                    <line x1="500" y1="160" x2="580" y2="180" stroke="black" strokeWidth="1" />
                    <line x1="510" y1="180" x2="590" y2="200" stroke="black" strokeWidth="1" />
                    <line x1="520" y1="200" x2="600" y2="220" stroke="black" strokeWidth="1" />
                    <line x1="530" y1="220" x2="610" y2="240" stroke="black" strokeWidth="1" />
                    <line x1="540" y1="240" x2="620" y2="260" stroke="black" strokeWidth="1" />
                    <line x1="550" y1="260" x2="630" y2="280" stroke="black" strokeWidth="1" />
                    <line x1="560" y1="280" x2="640" y2="300" stroke="black" strokeWidth="1" />
                    <line x1="570" y1="300" x2="650" y2="320" stroke="black" strokeWidth="1" />
                    
                    {/* Right boundary */}
                    <line x1="560" y1="140" x2="650" y2="320" stroke="black" strokeWidth="2" />
                    
                    {/* Square section at bottom right like in reference */}
                    <rect x="600" y="320" width="80" height="80" fill="none" stroke="black" strokeWidth="2" />
                    <line x1="620" y1="320" x2="620" y2="400" stroke="black" strokeWidth="1" />
                    <line x1="640" y1="320" x2="640" y2="400" stroke="black" strokeWidth="1" />
                    <line x1="660" y1="320" x2="660" y2="400" stroke="black" strokeWidth="1" />
                    
                    {/* Parcel numbers for angled section */}
                    <text x="500" y="135" className="text-xs font-mono print:text-[9px]" fill="black">10</text>
                    <text x="510" y="155" className="text-xs font-mono print:text-[9px]" fill="black">11</text>
                    <text x="520" y="175" className="text-xs font-mono print:text-[9px]" fill="black">12</text>
                    <text x="530" y="195" className="text-xs font-mono print:text-[9px]" fill="black">13</text>
                    <text x="540" y="215" className="text-xs font-mono print:text-[9px]" fill="black">14</text>
                    <text x="550" y="235" className="text-xs font-mono print:text-[9px]" fill="black">15</text>
                    <text x="560" y="255" className="text-xs font-mono print:text-[9px]" fill="black">16</text>
                    <text x="570" y="275" className="text-xs font-mono print:text-[9px]" fill="black">17</text>
                    <text x="580" y="295" className="text-xs font-mono print:text-[9px]" fill="black">18</text>
                    
                    {/* Numbers in square sections */}
                    <text x="608" y="345" className="text-xs font-mono print:text-[9px]" fill="black">19</text>
                    <text x="628" y="345" className="text-xs font-mono print:text-[9px]" fill="black">20</text>
                    <text x="648" y="345" className="text-xs font-mono print:text-[9px]" fill="black">21</text>
                    <text x="668" y="345" className="text-xs font-mono print:text-[9px]" fill="black">22</text>
                    
                    <text x="608" y="375" className="text-xs font-mono print:text-[9px]" fill="black">23</text>
                    <text x="628" y="375" className="text-xs font-mono print:text-[9px]" fill="black">24</text>
                    <text x="648" y="375" className="text-xs font-mono print:text-[9px]" fill="black">25</text>
                    <text x="668" y="375" className="text-xs font-mono print:text-[9px]" fill="black">26</text>
                  </g>
                </>
              )}

              {/* Sluices - connection points */}
              {layers.sluices && (
                <>
                  <circle cx="180" cy="120" r="4" fill="black" />
                  <circle cx="250" cy="120" r="4" fill="black" />
                  <circle cx="350" cy="120" r="4" fill="black" />
                  <circle cx="450" cy="120" r="4" fill="black" />
                  <circle cx="480" cy="120" r="4" fill="black" />
                  <circle cx="600" cy="120" r="4" fill="black" />
                </>
              )}

              {/* Connecting lines from canal to parcels */}
              {layers.pipes && (
                <>
                  <line x1="250" y1="120" x2="250" y2="200" stroke="black" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="350" y1="120" x2="350" y2="200" stroke="black" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="450" y1="120" x2="450" y2="200" stroke="black" strokeWidth="1" strokeDasharray="2,2" />
                </>
              )}

              {/* Scale */}
              <g transform="translate(650, 550)">
                <line x1="0" y1="0" x2="60" y2="0" stroke="black" strokeWidth="2" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="black" strokeWidth="1" />
                <line x1="60" y1="-3" x2="60" y2="3" stroke="black" strokeWidth="1" />
                <text x="15" y="-8" className="text-xs font-mono print:text-[10px]" fill="black">0  60м</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Panel - hidden on print */}
        <div className="w-80 space-y-6 print:hidden">
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

          {/* Legend matching the handwritten one */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Условные обозначения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-black"></div>
                <span>1. Магистральный канал</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-black opacity-60" style={{borderTop: '1px dashed black'}}></div>
                <span>2. Трубопровод</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-black"></div>
                <span>3. Межучастковый канал</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>4. Участковый канал</span>
              </div>

              <div className="mt-6 pt-4 border-t font-mono text-xs text-gray-600">
                <p>М 1:1000</p>
                <p>Лист 1 из 1</p>
                <p>Дата: {new Date().toLocaleDateString('ru-RU')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Техническая информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm font-mono">
              <div className="flex justify-between border-b pb-1">
                <span>Общее кол-во участков:</span>
                <span>26</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Кол-во шлюзов:</span>
                <span>6</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Длина маг. канала:</span>
                <span>560 м</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Общая площадь:</span>
                <span>18.2 га</span>
              </div>
              <div className="flex justify-between">
                <span>Тип орошения:</span>
                <span>Поверхностное</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Print styles */}
      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;