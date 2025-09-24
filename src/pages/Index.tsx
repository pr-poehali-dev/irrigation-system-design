import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  cropType: string;
}

interface Sluice {
  id: string;
  x: number;
  y: number;
  canalId: string;
}

const Index: React.FC = () => {
  const [canals, setCanals] = useState<Canal[]>([
    {
      id: 'main-1',
      points: [{ x: 100, y: 150 }, { x: 700, y: 150 }],
      type: 'main',
      width: 8
    }
  ]);
  
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [sluices, setSluices] = useState<Sluice[]>([]);
  const [selectedTool, setSelectedTool] = useState<'canal' | 'parcel' | 'sluice' | 'select'>('select');
  const [selectedCanalType, setSelectedCanalType] = useState<'main' | 'secondary' | 'tertiary'>('secondary');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCanal, setCurrentCanal] = useState<Point[]>([]);
  
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
          type: selectedCanalType,
          width: selectedCanalType === 'main' ? 8 : selectedCanalType === 'secondary' ? 4 : 2
        };
        setCanals(prev => [...prev, newCanal]);
        setIsDrawing(false);
        setCurrentCanal([]);
      }
    } else if (selectedTool === 'parcel') {
      const newParcel: Parcel = {
        id: `parcel-${Date.now()}`,
        x: x - 50,
        y: y - 40,
        width: 100,
        height: 80,
        area: 1.2,
        cropType: 'Пшеница'
      };
      setParcels(prev => [...prev, newParcel]);
    } else if (selectedTool === 'sluice') {
      const newSluice: Sluice = {
        id: `sluice-${Date.now()}`,
        x,
        y,
        canalId: 'main-1'
      };
      setSluices(prev => [...prev, newSluice]);
    }
  }, [selectedTool, selectedCanalType, isDrawing, currentCanal]);

  const clearAll = () => {
    setCanals([{
      id: 'main-1',
      points: [{ x: 100, y: 150 }, { x: 700, y: 150 }],
      type: 'main',
      width: 8
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
        totalCanals: canals.length,
        totalParcels: parcels.length
      }
    };
    
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'irrigation-project.json';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ПРОЕКТИРОВАНИЕ ОРОСИТЕЛЬНОЙ СИСТЕМЫ</h1>
            <p className="text-gray-600 mt-1">Интерактивное проектирование на карте участка</p>
          </div>
          <div className="flex gap-2">
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
                Инструменты проектирования
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedTool === 'select' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('select')}
                >
                  <Icon name="MousePointer" size={16} />
                </Button>
                <Button
                  variant={selectedTool === 'canal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('canal')}
                >
                  <Icon name="Waves" size={16} />
                </Button>
                <Button
                  variant={selectedTool === 'parcel' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('parcel')}
                >
                  <Icon name="Square" size={16} />
                </Button>
                <Button
                  variant={selectedTool === 'sluice' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTool('sluice')}
                >
                  <Icon name="Circle" size={16} />
                </Button>
              </div>
              
              {selectedTool === 'canal' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тип канала:</label>
                  <Select value={selectedCanalType} onValueChange={(value: 'main' | 'secondary' | 'tertiary') => setSelectedCanalType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Магистральный</SelectItem>
                      <SelectItem value="secondary">Участковый</SelectItem>
                      <SelectItem value="tertiary">Оросительный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
                {selectedTool === 'canal' && 'Кликайте для создания точек канала. Второй клик - завершить.'}
                {selectedTool === 'parcel' && 'Кликайте на карте для размещения участков.'}
                {selectedTool === 'sluice' && 'Кликайте для размещения шлюзов.'}
                {selectedTool === 'select' && 'Режим выбора и редактирования объектов.'}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика проекта</CardTitle>
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

          {/* Elements List */}
          <Card>
            <CardHeader>
              <CardTitle>Элементы системы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-60 overflow-y-auto">
              {parcels.map((parcel, index) => (
                <div key={parcel.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Участок {index + 1}</div>
                    <div className="text-xs text-gray-600">{parcel.area} га • {parcel.cropType}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setParcels(prev => prev.filter(p => p.id !== parcel.id))}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              ))}
              
              {canals.filter(c => c.type !== 'main').map((canal, index) => (
                <div key={canal.id} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Канал {index + 1}</div>
                    <div className="text-xs text-gray-600">
                      {canal.type === 'secondary' ? 'Участковый' : 'Оросительный'}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCanals(prev => prev.filter(c => c.id !== canal.id))}
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              ))}
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
                  Карта участка для проектирования
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Масштаб 1:1000</span>
                  <div className="w-16 h-1 bg-black"></div>
                  <span>100м</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 h-full">
              <div className="w-full h-full bg-green-50 border-2 border-gray-300 rounded-lg relative overflow-hidden">
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full cursor-crosshair"
                  onClick={handleMapClick}
                >
                  {/* Background terrain pattern */}
                  <defs>
                    <pattern id="terrain" width="50" height="50" patternUnits="userSpaceOnUse">
                      <rect width="50" height="50" fill="#f0f9ff" opacity="0.3" />
                      <circle cx="25" cy="25" r="2" fill="#22c55e" opacity="0.2" />
                    </pattern>
                  </defs>
                  <rect width="800" height="600" fill="url(#terrain)" />

                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="600" fill="url(#grid)" />

                  {/* Canals */}
                  {canals.map((canal) => (
                    <g key={canal.id}>
                      <polyline
                        points={canal.points.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke={
                          canal.type === 'main' ? '#1e40af' :
                          canal.type === 'secondary' ? '#2563eb' : '#3b82f6'
                        }
                        strokeWidth={canal.width}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="hover:opacity-75 transition-opacity"
                      />
                      {canal.points.length === 2 && (
                        <text
                          x={(canal.points[0].x + canal.points[1].x) / 2}
                          y={canal.points[0].y - 10}
                          className="text-xs font-mono fill-blue-700"
                          textAnchor="middle"
                        >
                          {canal.type === 'main' ? 'Магистральный канал' : 
                           canal.type === 'secondary' ? 'Участковый' : 'Оросительный'}
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
                      strokeWidth={selectedCanalType === 'main' ? 8 : selectedCanalType === 'secondary' ? 4 : 2}
                      strokeDasharray="5,5"
                    />
                  )}

                  {/* Parcels */}
                  {parcels.map((parcel, index) => (
                    <g key={parcel.id}>
                      <rect
                        x={parcel.x}
                        y={parcel.y}
                        width={parcel.width}
                        height={parcel.height}
                        fill="rgba(34, 197, 94, 0.2)"
                        stroke="#16a34a"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="hover:fill-opacity-40 transition-all cursor-pointer"
                      />
                      <text
                        x={parcel.x + parcel.width / 2}
                        y={parcel.y + parcel.height / 2 - 5}
                        className="text-xs font-mono fill-green-700"
                        textAnchor="middle"
                      >
                        Участок {index + 1}
                      </text>
                      <text
                        x={parcel.x + parcel.width / 2}
                        y={parcel.y + parcel.height / 2 + 8}
                        className="text-xs font-mono fill-green-600"
                        textAnchor="middle"
                      >
                        {parcel.area} га
                      </text>
                    </g>
                  ))}

                  {/* Sluices */}
                  {sluices.map((sluice, index) => (
                    <g key={sluice.id}>
                      <circle
                        cx={sluice.x}
                        cy={sluice.y}
                        r="8"
                        fill="#dc2626"
                        className="hover:scale-110 transition-transform cursor-pointer"
                      />
                      <text
                        x={sluice.x + 15}
                        y={sluice.y + 5}
                        className="text-xs font-mono fill-red-700"
                      >
                        Ш{index + 1}
                      </text>
                    </g>
                  ))}

                  {/* North Arrow */}
                  <g transform="translate(750, 50)">
                    <path d="M 0 -20 L -8 8 L 0 4 L 8 8 Z" fill="#374151" />
                    <text x="-5" y="25" className="text-sm font-mono fill-gray-700">С</text>
                  </g>

                  {/* Legend */}
                  <g transform="translate(20, 500)">
                    <rect x="0" y="0" width="200" height="80" fill="white" fillOpacity="0.9" stroke="#d1d5db" rx="4" />
                    <text x="10" y="15" className="text-xs font-bold fill-gray-800">Легенда:</text>
                    
                    <line x1="10" y1="25" x2="30" y2="25" stroke="#1e40af" strokeWidth="4" />
                    <text x="35" y="28" className="text-xs fill-gray-700">Магистральный канал</text>
                    
                    <line x1="10" y1="35" x2="30" y2="35" stroke="#2563eb" strokeWidth="2" />
                    <text x="35" y="38" className="text-xs fill-gray-700">Участковый канал</text>
                    
                    <rect x="10" y="42" width="15" height="10" fill="rgba(34, 197, 94, 0.2)" stroke="#16a34a" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="35" y="48" className="text-xs fill-gray-700">Участок</text>
                    
                    <circle cx="17" cy="60" r="4" fill="#dc2626" />
                    <text x="35" y="63" className="text-xs fill-gray-700">Шлюз</text>
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