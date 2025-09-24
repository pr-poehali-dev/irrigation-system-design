import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Point {
  x: number;
  y: number;
}

interface Canal {
  id: string;
  points: Point[];
  type: 'main' | 'secondary' | 'tertiary';
  width: number;
}

interface Parcel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
  number: number;
}

interface Sluice {
  id: string;
  x: number;
  y: number;
  number: number;
}

const Index: React.FC = () => {
  // Базовая схема с твоего рисунка
  const [canals, setCanals] = useState<Canal[]>([
    {
      id: 'main-1',
      points: [{ x: 120, y: 120 }, { x: 680, y: 120 }],
      type: 'main',
      width: 3
    }
  ]);
  
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [sluices, setSluices] = useState<Sluice[]>([]);
  const [selectedTool, setSelectedTool] = useState<'canal' | 'parcel' | 'sluice' | 'select'>('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCanal, setCurrentCanal] = useState<Point[]>([]);
  const [showLayers, setShowLayers] = useState({
    canals: true,
    parcels: true,
    sluices: true,
    baseScheme: true
  });

  // Схема участка точно как на рисунке
  const baseScheme = {
    leftParcels: Array.from({ length: 9 }, (_, i) => ({
      x: 120, y: 120 + i * 40, width: 60, height: 40, number: i + 1
    })),
    rightAngledLines: [
      // Правая угловая часть - основные линии
      { x1: 480, y1: 120, x2: 600, y2: 320 },
      { x1: 560, y1: 140, x2: 650, y2: 320 },
      // Перпендикулярные линии
      ...Array.from({ length: 11 }, (_, i) => ({
        x1: 480 + i * 10, y1: 120 + i * 20, 
        x2: 560 + i * 8, y2: 140 + i * 18
      }))
    ],
    bottomSquare: { x: 600, y: 320, width: 80, height: 80 }
  };
  
  const handleMapClick = useCallback((event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 800;
    const y = ((event.clientY - rect.top) / rect.height) * 600;

    if (selectedTool === 'canal') {
      if (!isDrawing) {
        setIsDrawing(true);
        setCurrentCanal([{ x, y }]);
      } else {
        const newCanal: Canal = {
          id: `canal-${Date.now()}`,
          points: [...currentCanal, { x, y }],
          type: 'secondary',
          width: 2
        };
        setCanals(prev => [...prev, newCanal]);
        setIsDrawing(false);
        setCurrentCanal([]);
      }
    } else if (selectedTool === 'parcel') {
      const newParcel: Parcel = {
        id: `parcel-${Date.now()}`,
        x: x - 30,
        y: y - 20,
        width: 60,
        height: 40,
        area: 0.8,
        number: parcels.length + 10
      };
      setParcels(prev => [...prev, newParcel]);
    } else if (selectedTool === 'sluice') {
      const newSluice: Sluice = {
        id: `sluice-${Date.now()}`,
        x,
        y,
        number: sluices.length + 7
      };
      setSluices(prev => [...prev, newSluice]);
    }
  }, [selectedTool, isDrawing, currentCanal, parcels.length, sluices.length]);

  const loadBaseScheme = () => {
    // Загружаем схему точно как на рисунке
    const baseParcels = baseScheme.leftParcels.map((p, index) => ({
      id: `base-parcel-${index}`,
      x: p.x,
      y: p.y,
      width: p.width,
      height: p.height,
      area: 0.8,
      number: p.number
    }));
    
    setParcels(baseParcels);
    
    // Базовые шлюзы
    setSluices([
      { id: 'sluice-1', x: 180, y: 120, number: 1 },
      { id: 'sluice-2', x: 250, y: 120, number: 2 },
      { id: 'sluice-3', x: 350, y: 120, number: 3 },
      { id: 'sluice-4', x: 450, y: 120, number: 4 },
      { id: 'sluice-5', x: 480, y: 120, number: 5 },
      { id: 'sluice-6', x: 600, y: 120, number: 6 }
    ]);
  };

  const clearAll = () => {
    setCanals([{
      id: 'main-1',
      points: [{ x: 120, y: 120 }, { x: 680, y: 120 }],
      type: 'main',
      width: 3
    }]);
    setParcels([]);
    setSluices([]);
  };

  const exportProject = () => {
    const project = {
      canals,
      parcels,
      sluices,
      metadata: {
        created: new Date().toISOString(),
        totalArea: parcels.reduce((sum, p) => sum + p.area, 0),
        totalParcels: parcels.length,
        scheme: 'irrigation-system-from-drawing'
      }
    };
    
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'irrigation-scheme.json';
    a.click();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-black">СХЕМА ОРОСИТЕЛЬНОЙ СИСТЕМЫ</h1>
            <p className="text-gray-700 mt-1">Проектирование на основе участка • Масштаб 1:1000</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadBaseScheme} variant="outline">
              <Icon name="FileText" size={16} className="mr-2" />
              Загрузить схему
            </Button>
            <Button onClick={exportProject} variant="outline">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
            <Button onClick={clearAll} variant="destructive">
              <Icon name="Trash2" size={16} className="mr-2" />
              Очистить
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Tools Panel */}
        <div className="col-span-3 space-y-4">
          {/* Tool Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wrench" size={20} />
                Инструменты
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedTool === 'select' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('select')}
                  title="Выбор"
                >
                  <Icon name="MousePointer" size={16} />
                </Button>
                <Button
                  variant={selectedTool === 'canal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('canal')}
                  title="Канал"
                >
                  <Icon name="Waves" size={16} />
                </Button>
                <Button
                  variant={selectedTool === 'parcel' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('parcel')}
                  title="Участок"
                >
                  <Icon name="Square" size={16} />
                </Button>
                <Button
                  variant={selectedTool === 'sluice' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('sluice')}
                  title="Шлюз"
                >
                  <Icon name="Circle" size={16} />
                </Button>
              </div>
              
              <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
                {selectedTool === 'canal' && 'Клик - начать канал, второй клик - завершить'}
                {selectedTool === 'parcel' && 'Кликайте для добавления участков'}
                {selectedTool === 'sluice' && 'Кликайте для размещения шлюзов'}
                {selectedTool === 'select' && 'Режим выбора объектов'}
              </div>
            </CardContent>
          </Card>

          {/* Layers */}
          <Card>
            <CardHeader>
              <CardTitle>Слои</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Базовая схема</label>
                <Switch
                  checked={showLayers.baseScheme}
                  onCheckedChange={(checked) => setShowLayers(prev => ({...prev, baseScheme: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Каналы</label>
                <Switch
                  checked={showLayers.canals}
                  onCheckedChange={(checked) => setShowLayers(prev => ({...prev, canals: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Участки</label>
                <Switch
                  checked={showLayers.parcels}
                  onCheckedChange={(checked) => setShowLayers(prev => ({...prev, parcels: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Шлюзы</label>
                <Switch
                  checked={showLayers.sluices}
                  onCheckedChange={(checked) => setShowLayers(prev => ({...prev, sluices: checked}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Каналов:</span>
                <Badge variant="secondary">{canals.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Участков:</span>
                <Badge variant="secondary">{parcels.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Шлюзов:</span>
                <Badge variant="secondary">{sluices.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Общая площадь:</span>
                <Badge>{parcels.reduce((sum, p) => sum + p.area, 0).toFixed(1)} га</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Условные обозначения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-black"></div>
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
            </CardContent>
          </Card>
        </div>

        {/* Map Area */}
        <div className="col-span-9">
          <Card className="h-[700px]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon name="Map" size={20} />
                  Схема участка
                </span>
                <div className="text-sm text-gray-700">
                  М 1:1000
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-full">
              <div className="w-full h-full bg-white border-2 border-gray-800 rounded-lg relative overflow-hidden">
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full cursor-crosshair"
                  onClick={handleMapClick}
                >
                  {/* North Arrow */}
                  <g transform="translate(50, 50)">
                    <path d="M 0 -15 L -6 6 L 0 3 L 6 6 Z" fill="black" strokeWidth="1" stroke="black"/>
                    <text x="-3" y="20" className="text-xs font-mono" fill="black">С</text>
                  </g>

                  {/* Base Scheme Outline (точно как на рисунке) */}
                  {showLayers.baseScheme && (
                    <g stroke="#ccc" strokeWidth="1" fill="none" strokeDasharray="3,3">
                      {/* Left parcels outline */}
                      <rect x="120" y="120" width="60" height="360" />
                      {baseScheme.leftParcels.map((_, index) => (
                        <line key={index} x1="120" y1={120 + (index + 1) * 40} x2="180" y2={120 + (index + 1) * 40} />
                      ))}
                      
                      {/* Right angled area - как на рисунке */}
                      <line x1="480" y1="120" x2="600" y2="320" />
                      <line x1="560" y1="140" x2="650" y2="320" />
                      
                      {/* Перпендикулярные линии */}
                      {baseScheme.rightAngledLines.slice(2).map((line, index) => (
                        <line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
                      ))}
                      
                      {/* Нижний квадрат */}
                      <rect x={baseScheme.bottomSquare.x} y={baseScheme.bottomSquare.y}
                            width={baseScheme.bottomSquare.width} height={baseScheme.bottomSquare.height} />
                      
                      {/* Вертикальные линии в квадрате */}
                      <line x1="620" y1="320" x2="620" y2="400" />
                      <line x1="640" y1="320" x2="640" y2="400" />
                      <line x1="660" y1="320" x2="660" y2="400" />
                    </g>
                  )}

                  {/* Canals */}
                  {showLayers.canals && canals.map((canal) => (
                    <g key={canal.id}>
                      <polyline
                        points={canal.points.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#000000"
                        strokeWidth={canal.width}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="hover:opacity-75 transition-opacity cursor-pointer"
                      />
                      {canal.points.length === 2 && canal.type === 'main' && (
                        <text
                          x={(canal.points[0].x + canal.points[1].x) / 2}
                          y={canal.points[0].y - 10}
                          className="text-xs font-mono fill-black"
                          textAnchor="middle"
                        >
                          Магистральный канал
                        </text>
                      )}
                    </g>
                  ))}

                  {/* Current drawing canal */}
                  {isDrawing && currentCanal.length > 0 && (
                    <polyline
                      points={currentCanal.map(p => `${p.x},${p.y}`).join(' ')}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5,5"
                    />
                  )}

                  {/* Parcels */}
                  {showLayers.parcels && parcels.map((parcel) => (
                    <g key={parcel.id}>
                      <rect
                        x={parcel.x}
                        y={parcel.y}
                        width={parcel.width}
                        height={parcel.height}
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="hover:fill-opacity-20 hover:fill-green-100 transition-all cursor-pointer"
                      />
                      <text
                        x={parcel.x + parcel.width / 2}
                        y={parcel.y + parcel.height / 2 + 3}
                        className="text-xs font-mono fill-black"
                        textAnchor="middle"
                      >
                        {parcel.number}
                      </text>
                    </g>
                  ))}

                  {/* Sluices */}
                  {showLayers.sluices && sluices.map((sluice) => (
                    <g key={sluice.id}>
                      <circle
                        cx={sluice.x}
                        cy={sluice.y}
                        r="4"
                        fill="#000000"
                        className="hover:scale-125 transition-transform cursor-pointer"
                      />
                      <text
                        x={sluice.x + 10}
                        y={sluice.y + 3}
                        className="text-xs font-mono fill-black"
                      >
                        {sluice.number}
                      </text>
                    </g>
                  ))}

                  {/* Scale */}
                  <g transform="translate(650, 550)">
                    <line x1="0" y1="0" x2="60" y2="0" stroke="black" strokeWidth="2" />
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="black" strokeWidth="1" />
                    <line x1="60" y1="-3" x2="60" y2="3" stroke="black" strokeWidth="1" />
                    <text x="20" y="-8" className="text-xs font-mono" fill="black">0   60м</text>
                  </g>

                  {/* Legend как на рисунке */}
                  <g transform="translate(20, 480)">
                    <text x="0" y="15" className="text-sm fill-black">1. Магистральный канал</text>
                    <text x="0" y="30" className="text-sm fill-black">2. Трубопровод</text>
                    <text x="0" y="45" className="text-sm fill-black">3. Межучастковый канал</text>
                    <text x="0" y="60" className="text-sm fill-black">4. Участковый канал</text>
                    
                    <text x="0" y="90" className="text-xs font-mono fill-black">М 1:1000</text>
                    <text x="0" y="105" className="text-xs font-mono fill-black">Дата: {new Date().toLocaleDateString('ru-RU')}</text>
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