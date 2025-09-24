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
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-mono">СХЕМА ОРОСИТЕЛЬНОЙ СИСТЕМЫ</h1>
            <p className="text-gray-600 mt-1">Технический план участка • Масштаб 1:1000</p>
          </div>
          <div className="text-sm text-gray-500 font-mono">
            Формат: A4<br />
            Дата: {new Date().toLocaleDateString('ru-RU')}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        {/* Control Panel */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Управление слоями
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Магистральные каналы</label>
                <Switch
                  checked={layers.mainChannels}
                  onCheckedChange={() => toggleLayer('mainChannels')}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Трубопроводы</label>
                <Switch
                  checked={layers.pipes}
                  onCheckedChange={() => toggleLayer('pipes')}
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
                <label className="text-sm font-medium">Участки</label>
                <Switch
                  checked={layers.parcels}
                  onCheckedChange={() => toggleLayer('parcels')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Map" size={20} />
                Легенда
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-blue-600 rounded"></div>
                <span className="text-sm">Магистральный канал</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-green-600 rounded"></div>
                <span className="text-sm">Участковый канал</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-orange-500 rounded"></div>
                <span className="text-sm">Трубопровод</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">Шлюз</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-600 rounded"></div>
                <span className="text-sm">Участок</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Droplets" size={16} className="text-blue-500" />
                <span className="text-sm">Источник воды</span>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Участков:</span>
                <span className="font-mono">12</span>
              </div>
              <div className="flex justify-between">
                <span>Шлюзов:</span>
                <span className="font-mono">8</span>
              </div>
              <div className="flex justify-between">
                <span>Общая длина каналов:</span>
                <span className="font-mono">2.4 км</span>
              </div>
              <div className="flex justify-between">
                <span>Площадь орошения:</span>
                <span className="font-mono">15.2 га</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Diagram */}
        <div className="col-span-9">
          <Card className="h-[800px]">
            <CardContent className="p-6 h-full">
              <div className="relative w-full h-full bg-white border rounded-lg overflow-hidden">
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full"
                  style={{ backgroundColor: '#fefefe' }}
                >
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="600" fill="url(#grid)" />

                  {/* Main Water Channel */}
                  {layers.mainChannels && (
                    <>
                      <path
                        d="M 50 100 Q 150 80 250 120 Q 350 160 450 140 Q 550 120 650 150 Q 720 170 780 160"
                        fill="none"
                        stroke="#0066CC"
                        strokeWidth="8"
                        className="animate-fade-in"
                      />
                      <text x="60" y="90" className="text-xs font-mono" fill="#0066CC">Магистральный канал</text>
                    </>
                  )}

                  {/* Parcels */}
                  {layers.parcels && (
                    <>
                      <rect x="100" y="200" width="120" height="80" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" className="animate-fade-in" />
                      <text x="140" y="235" className="text-xs font-mono" fill="#666">Участок 1</text>
                      <text x="135" y="250" className="text-xs font-mono" fill="#666">2.1 га</text>

                      <rect x="240" y="180" width="100" height="100" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" className="animate-fade-in" />
                      <text x="270" y="215" className="text-xs font-mono" fill="#666">Участок 2</text>
                      <text x="265" y="230" className="text-xs font-mono" fill="#666">1.8 га</text>

                      <rect x="360" y="200" width="140" height="90" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" className="animate-fade-in" />
                      <text x="410" y="235" className="text-xs font-mono" fill="#666">Участок 3</text>
                      <text x="405" y="250" className="text-xs font-mono" fill="#666">2.5 га</text>

                      <rect x="520" y="220" width="110" height="70" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" className="animate-fade-in" />
                      <text x="555" y="245" className="text-xs font-mono" fill="#666">Участок 4</text>
                      <text x="550" y="260" className="text-xs font-mono" fill="#666">1.6 га</text>

                      <rect x="150" y="320" width="130" height="90" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" className="animate-fade-in" />
                      <text x="190" y="355" className="text-xs font-mono" fill="#666">Участок 5</text>
                      <text x="185" y="370" className="text-xs font-mono" fill="#666">2.3 га</text>

                      <rect x="300" y="340" width="120" height="80" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="5,5" className="animate-fade-in" />
                      <text x="340" y="375" className="text-xs font-mono" fill="#666">Участок 6</text>
                      <text x="335" y="390" className="text-xs font-mono" fill="#666">1.9 га</text>
                    </>
                  )}

                  {/* Secondary Channels */}
                  {layers.mainChannels && (
                    <>
                      <path d="M 160 120 L 160 200" stroke="#FF6B35" strokeWidth="4" fill="none" className="animate-fade-in" />
                      <path d="M 290 130 L 290 180" stroke="#FF6B35" strokeWidth="4" fill="none" className="animate-fade-in" />
                      <path d="M 430 140 L 430 200" stroke="#FF6B35" strokeWidth="4" fill="none" className="animate-fade-in" />
                      <path d="M 575 150 L 575 220" stroke="#FF6B35" strokeWidth="4" fill="none" className="animate-fade-in" />

                      <path d="M 160 280 L 160 320" stroke="#FF6B35" strokeWidth="4" fill="none" className="animate-fade-in" />
                      <path d="M 280 280 L 280 340" stroke="#FF6B35" strokeWidth="4" fill="none" className="animate-fade-in" />
                    </>
                  )}

                  {/* Pipes */}
                  {layers.pipes && (
                    <>
                      <path d="M 100 240 L 220 240" stroke="#2C3E50" strokeWidth="3" strokeDasharray="8,4" className="animate-fade-in" />
                      <path d="M 240 230 L 360 230" stroke="#2C3E50" strokeWidth="3" strokeDasharray="8,4" className="animate-fade-in" />
                      <path d="M 360 245 L 520 245" stroke="#2C3E50" strokeWidth="3" strokeDasharray="8,4" className="animate-fade-in" />
                      
                      <path d="M 150 365 L 300 365" stroke="#2C3E50" strokeWidth="3" strokeDasharray="8,4" className="animate-fade-in" />
                    </>
                  )}

                  {/* Sluices */}
                  {layers.sluices && (
                    <>
                      <circle cx="160" cy="120" r="6" fill="#DC2626" className="animate-scale-in" />
                      <text x="170" y="115" className="text-xs font-mono" fill="#DC2626">Ш1</text>

                      <circle cx="290" cy="130" r="6" fill="#DC2626" className="animate-scale-in" />
                      <text x="300" y="125" className="text-xs font-mono" fill="#DC2626">Ш2</text>

                      <circle cx="430" cy="140" r="6" fill="#DC2626" className="animate-scale-in" />
                      <text x="440" y="135" className="text-xs font-mono" fill="#DC2626">Ш3</text>

                      <circle cx="575" cy="150" r="6" fill="#DC2626" className="animate-scale-in" />
                      <text x="585" y="145" className="text-xs font-mono" fill="#DC2626">Ш4</text>

                      <circle cx="160" cy="280" r="6" fill="#DC2626" className="animate-scale-in" />
                      <text x="170" y="275" className="text-xs font-mono" fill="#DC2626">Ш5</text>

                      <circle cx="280" cy="280" r="6" fill="#DC2626" className="animate-scale-in" />
                      <text x="290" y="275" className="text-xs font-mono" fill="#DC2626">Ш6</text>
                    </>
                  )}

                  {/* Water Source */}
                  <circle cx="50" cy="100" r="15" fill="#0EA5E9" className="animate-pulse" />
                  <text x="25" y="85" className="text-xs font-mono" fill="#0EA5E9">Источник</text>

                  {/* North Arrow */}
                  <g transform="translate(720, 80)">
                    <path d="M 0 -20 L -8 0 L 0 -15 L 8 0 Z" fill="#666" />
                    <text x="-5" y="15" className="text-xs font-mono" fill="#666">N</text>
                  </g>

                  {/* Scale */}
                  <g transform="translate(50, 550)">
                    <line x1="0" y1="0" x2="100" y2="0" stroke="#666" strokeWidth="2" />
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="#666" strokeWidth="2" />
                    <line x1="100" y1="-3" x2="100" y2="3" stroke="#666" strokeWidth="2" />
                    <text x="25" y="-10" className="text-xs font-mono" fill="#666">0 — 100м</text>
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;