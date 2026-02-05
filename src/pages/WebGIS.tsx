 import { MainLayout } from '@/components/layout/MainLayout';
 import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
 import { Icon, LatLngBounds } from 'leaflet';
 import 'leaflet/dist/leaflet.css';
 import { useState, useEffect } from 'react';
 import { mockLicenses } from '@/data/mockData';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Input } from '@/components/ui/input';
 import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
 } from '@/components/ui/select';
 import {
 Search,
 Layers,
 MapPin,
 Filter,
 ZoomIn,
 ZoomOut,
 Locate,
 FileText,
 Building2,
 Calendar,
 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 // Fix for default marker icons in Leaflet with Vite
 import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
 import markerIcon from 'leaflet/dist/images/marker-icon.png';
 import markerShadow from 'leaflet/dist/images/marker-shadow.png';
 
 // Mock coordinates for licenses
 const licenseLocations = [
   { id: '1', lat: -25.0, lng: -44.5, name: 'Campo de Produção Atlântico Sul' },
   { id: '2', lat: -22.5, lng: -40.0, name: 'Plataforma FPSO Guanabara' },
   { id: '3', lat: -23.96, lng: -46.33, name: 'Terminal de Regaseificação GNL' },
   { id: '4', lat: -22.37, lng: -41.78, name: 'Parque Eólico Ventos do Nordeste' },
   { id: '5', lat: -19.97, lng: -44.03, name: 'Refinaria Gabriel Passos' },
 ];
 
 const statusColors: Record<string, string> = {
   vigente: 'bg-success text-success-foreground',
   vencida: 'bg-destructive text-destructive-foreground',
   em_renovacao: 'bg-warning text-warning-foreground',
   suspensa: 'bg-muted text-muted-foreground',
 };
 
 const statusLabels: Record<string, string> = {
   vigente: 'Vigente',
   vencida: 'Vencida',
   em_renovacao: 'Em Renovação',
   suspensa: 'Suspensa',
 };
 
 // Custom marker icons based on status
 const createCustomIcon = (status: string) => {
   const colors: Record<string, string> = {
     vigente: '#16a34a',
     vencida: '#dc2626',
     em_renovacao: '#f59e0b',
     suspensa: '#6b7280',
   };
 
   return new Icon({
     iconUrl: markerIcon,
     iconRetinaUrl: markerIcon2x,
     shadowUrl: markerShadow,
     iconSize: [25, 41],
     iconAnchor: [12, 41],
     popupAnchor: [1, -34],
     shadowSize: [41, 41],
   });
 };
 
 function MapControls() {
   const map = useMap();
 
   const handleZoomIn = () => map.zoomIn();
   const handleZoomOut = () => map.zoomOut();
   const handleLocate = () => {
     map.setView([-22.5, -43.0], 6);
   };
 
   return (
     <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
       <Button
         size="icon"
         variant="secondary"
         className="h-10 w-10 bg-background shadow-md border"
         onClick={handleZoomIn}
       >
         <ZoomIn className="h-4 w-4" />
       </Button>
       <Button
         size="icon"
         variant="secondary"
         className="h-10 w-10 bg-background shadow-md border"
         onClick={handleZoomOut}
       >
         <ZoomOut className="h-4 w-4" />
       </Button>
       <Button
         size="icon"
         variant="secondary"
         className="h-10 w-10 bg-background shadow-md border"
         onClick={handleLocate}
       >
         <Locate className="h-4 w-4" />
       </Button>
     </div>
   );
 }
 
 export default function WebGIS() {
   const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [statusFilter, setStatusFilter] = useState<string>('all');
   const [showFilters, setShowFilters] = useState(true);
 
   const filteredLicenses = mockLicenses.filter((license) => {
     const matchesSearch =
       license.enterprise.toLowerCase().includes(searchQuery.toLowerCase()) ||
       license.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesStatus =
       statusFilter === 'all' || license.status === statusFilter;
     return matchesSearch && matchesStatus;
   });
 
   const getLicenseById = (id: string) =>
     mockLicenses.find((l) => l.id === id);
 
   const getLocationById = (id: string) =>
     licenseLocations.find((l) => l.id === id);
 
   return (
     <MainLayout title="WebGIS" subtitle="Visualização geográfica de licenças e condicionantes">
       <div className="h-[calc(100vh-12rem)] flex gap-4">
         {/* Sidebar Panel */}
         <Card className={cn(
           "transition-all duration-300 flex flex-col",
           showFilters ? "w-80" : "w-0 overflow-hidden opacity-0"
         )}>
           <CardHeader className="pb-3">
             <CardTitle className="text-base flex items-center gap-2">
               <Layers className="h-4 w-4" />
               Camadas e Filtros
             </CardTitle>
           </CardHeader>
           <CardContent className="flex-1 overflow-hidden flex flex-col gap-4">
             {/* Search */}
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                 placeholder="Buscar licenças..."
                 className="pl-9"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
 
             {/* Status Filter */}
             <Select value={statusFilter} onValueChange={setStatusFilter}>
               <SelectTrigger>
                 <SelectValue placeholder="Filtrar por status" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">Todos os status</SelectItem>
                 <SelectItem value="vigente">Vigentes</SelectItem>
                 <SelectItem value="vencida">Vencidas</SelectItem>
                 <SelectItem value="em_renovacao">Em Renovação</SelectItem>
               </SelectContent>
             </Select>
 
             {/* Legend */}
             <div className="space-y-2">
               <h4 className="text-sm font-medium text-muted-foreground">Legenda</h4>
               <div className="grid gap-2">
                 <div className="flex items-center gap-2 text-sm">
                   <div className="w-3 h-3 rounded-full bg-success" />
                   <span>Vigentes</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm">
                   <div className="w-3 h-3 rounded-full bg-destructive" />
                   <span>Vencidas</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm">
                   <div className="w-3 h-3 rounded-full bg-warning" />
                   <span>Em Renovação</span>
                 </div>
               </div>
             </div>
 
             {/* License List */}
             <div className="flex-1 overflow-auto space-y-2">
               <h4 className="text-sm font-medium text-muted-foreground sticky top-0 bg-card py-1">
                 Licenças ({filteredLicenses.length})
               </h4>
               {filteredLicenses.map((license) => (
                 <button
                   key={license.id}
                   onClick={() => setSelectedLicense(license.id)}
                   className={cn(
                     "w-full text-left p-3 rounded-lg border transition-colors",
                     selectedLicense === license.id
                       ? "border-primary bg-primary/5"
                       : "border-border hover:bg-muted/50"
                   )}
                 >
                   <div className="flex items-start justify-between gap-2">
                     <div className="min-w-0 flex-1">
                       <p className="text-sm font-medium truncate">
                         {license.licenseNumber}
                       </p>
                       <p className="text-xs text-muted-foreground truncate">
                         {license.enterprise}
                       </p>
                     </div>
                     <Badge
                       variant="secondary"
                       className={cn("text-[10px] shrink-0", statusColors[license.status])}
                     >
                       {statusLabels[license.status]}
                     </Badge>
                   </div>
                 </button>
               ))}
             </div>
           </CardContent>
         </Card>
 
         {/* Map Container */}
         <div className="flex-1 relative rounded-xl overflow-hidden border bg-muted">
           {/* Toggle Filters Button */}
           <Button
             variant="secondary"
             size="sm"
             className="absolute left-4 top-4 z-[1000] bg-background shadow-md border"
             onClick={() => setShowFilters(!showFilters)}
           >
             <Filter className="h-4 w-4 mr-2" />
             {showFilters ? 'Ocultar' : 'Filtros'}
           </Button>
 
           <MapContainer
             center={[-22.5, -43.0]}
             zoom={6}
             className="h-full w-full"
             zoomControl={false}
           >
             <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
             <MapControls />
 
             {filteredLicenses.map((license) => {
               const location = getLocationById(license.id);
               if (!location) return null;
 
               return (
                 <Marker
                   key={license.id}
                   position={[location.lat, location.lng]}
                   icon={createCustomIcon(license.status)}
                   eventHandlers={{
                     click: () => setSelectedLicense(license.id),
                   }}
                 >
                   <Popup>
                     <div className="min-w-[200px] p-1">
                       <div className="flex items-start justify-between gap-2 mb-2">
                         <h3 className="font-semibold text-sm">
                           {license.licenseNumber}
                         </h3>
                         <Badge
                           variant="secondary"
                           className={cn("text-[10px]", statusColors[license.status])}
                         >
                           {statusLabels[license.status]}
                         </Badge>
                       </div>
 
                       <div className="space-y-1.5 text-xs text-muted-foreground">
                         <div className="flex items-center gap-2">
                           <Building2 className="h-3 w-3" />
                           <span className="truncate">{license.enterprise}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <MapPin className="h-3 w-3" />
                           <span>{license.location}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <Calendar className="h-3 w-3" />
                           <span>Vence: {new Date(license.expirationDate).toLocaleDateString('pt-BR')}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <FileText className="h-3 w-3" />
                           <span>
                             Condicionantes: {license.completedConditionants}/{license.conditionantsCount}
                           </span>
                         </div>
                       </div>
 
                       <Button size="sm" className="w-full mt-3 h-7 text-xs">
                         Ver detalhes
                       </Button>
                     </div>
                   </Popup>
                 </Marker>
               );
             })}
           </MapContainer>
 
           {/* Selected License Info Panel */}
           {selectedLicense && (
             <Card className="absolute bottom-4 left-4 right-4 z-[1000] max-w-md">
               <CardContent className="p-4">
                 {(() => {
                   const license = getLicenseById(selectedLicense);
                   if (!license) return null;
 
                   return (
                     <div className="space-y-3">
                       <div className="flex items-start justify-between">
                         <div>
                           <h3 className="font-semibold">{license.licenseNumber}</h3>
                           <p className="text-sm text-muted-foreground">
                             {license.enterprise}
                           </p>
                         </div>
                         <Badge className={cn(statusColors[license.status])}>
                           {statusLabels[license.status]}
                         </Badge>
                       </div>
 
                       <div className="grid grid-cols-2 gap-4 text-sm">
                         <div>
                           <p className="text-muted-foreground">Órgão</p>
                           <p className="font-medium">{license.licensingBody}</p>
                         </div>
                         <div>
                           <p className="text-muted-foreground">Validade</p>
                           <p className="font-medium">
                             {new Date(license.expirationDate).toLocaleDateString('pt-BR')}
                           </p>
                         </div>
                         <div>
                           <p className="text-muted-foreground">Condicionantes</p>
                           <p className="font-medium">
                             {license.completedConditionants}/{license.conditionantsCount} cumpridas
                           </p>
                         </div>
                         <div>
                           <p className="text-muted-foreground">Localização</p>
                           <p className="font-medium">{license.location}</p>
                         </div>
                       </div>
 
                       <div className="flex gap-2">
                         <Button size="sm" className="flex-1">
                           Ver Licença
                         </Button>
                         <Button
                           size="sm"
                           variant="outline"
                           onClick={() => setSelectedLicense(null)}
                         >
                           Fechar
                         </Button>
                       </div>
                     </div>
                   );
                 })()}
               </CardContent>
             </Card>
           )}
         </div>
       </div>
     </MainLayout>
   );
 }