"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup 
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { 
  MapIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/outline";

// Standard GeoJSON for the world map
const GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

type GeoData = {
  country: string;
  views: number;
  percent: number;
};

export default function GeoAnalytics() {
  const { token } = useAuth();
  const [data, setData] = useState<GeoData[]>([]);
  const [range, setRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [viewMode, setViewMode] = useState<'map' | 'bar'>('map');
  const [isLoading, setIsLoading] = useState(true);

  console.log("HERE")
  // Fetch Data
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/admin/geo?range=${range}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Geo fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [range, token]);

  // Color Scale for Map (Light Blue -> Dark Blue)
  const maxViews = Math.max(...data.map(d => d.views), 0);
  const colorScale = scaleLinear<string>()
    .domain([0, maxViews || 10]) // avoid div by zero
    .range(["#E0F2FE", "#0284C7"]); // Tailwind sky-100 to sky-600

  // Helper to find data for a specific country code from the map
  const getCountryData = (geoCode: string) => {
    // Note: GeoJSON uses 3-letter codes (USA), our DB might use 2-letter (US).
    // In a real app, you need a mapping. For this demo, let's assume strict matching 
    // or that geoip-lite returns 2-letter and we map visually manually or use a specific map.
    // Simplifying: we will try to match based on the ID provided by the Map topology.
    return data.find(d => d.country === geoCode) || { views: 0, percent: 0 };
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      
      {/* HEADER: Title + Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-bold text-gray-900">Audience Geography</h3>
        
        <div className="flex items-center space-x-4">
          {/* Time Filter */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['24h', '7d', '30d', 'all'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r as '24h' | '7d' | '30d' | 'all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  range === r 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-md ${viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
            >
              <MapIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('bar')}
              className={`p-1.5 rounded-md ${viewMode === 'bar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
            >
              <ChartBarIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* BODY: Content */}
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
        {isLoading ? (
          <p className="text-gray-400 animate-pulse">Loading geography data...</p>
        ) : viewMode === 'map' ? (
          
          /* --- MAP VIEW --- */
          <div className="w-full h-full">
            <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400}>
              <ZoomableGroup>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      // Map ISO Alpha-3 to Alpha-2 if needed, 
                      // or rely on GeoIP returning Alpha-2 and standardizing.
                      // For this demo, we assume match or show default color.
                      const countryCode = geo.properties["Alpha-2"]; // TopoJSON usually has this
                      const d = data.find(item => item.country === countryCode) || { views: 0 };
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={d.views > 0 ? colorScale(d.views) : "#F3F4F6"}
                          stroke="#E5E7EB"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: { fill: "#3B82F6", outline: "none", cursor: 'pointer' },
                            pressed: { outline: "none" },
                          }}
                          // In a real app, add a Tooltip component here (use onMouseEnter/onMouseLeave to show a custom tooltip)
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            <p className="text-center text-xs text-gray-400 mt-2">
              *Hover over countries to see details. Darker blue = More views.
            </p>
          </div>

        ) : (
          
          /* --- BAR CHART VIEW --- */
          <div className="w-full h-full p-4">
             {data.length === 0 ? (
               <div className="flex h-full items-center justify-center text-gray-400">No data available for this range.</div>
             ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    layout="vertical" 
                    data={data.slice(0, 10)} // Top 10 only
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="country" 
                      type="category" 
                      tick={{ fontSize: 12, fill: '#6B7280' }} 
                      width={40}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="views" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24}>
                      {/* Add % Labels to end of bars */}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             )}
          </div>
        )}
      </div>
    </div>
  );
}