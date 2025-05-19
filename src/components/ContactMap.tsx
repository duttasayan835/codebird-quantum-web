
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ContactMapProps {
  token?: string;
}

const ContactMap: React.FC<ContactMapProps> = ({ token }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | undefined>(token);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.4194, 37.7749], // San Francisco
      zoom: 13,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'bottom-right'
    );

    // Add marker for office location
    const marker = new mapboxgl.Marker({ color: '#8b5cf6' })
      .setLngLat([-122.4194, 37.7749])
      .addTo(map.current);

    // Add popup for office location
    new mapboxgl.Popup({ offset: 25, closeButton: false })
      .setLngLat([-122.4194, 37.7749])
      .setHTML('<h3 class="font-semibold">CodeBird Society HQ</h3><p>123 Innovation Street, San Francisco, CA</p>')
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {!mapboxToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-center p-6">
          <h3 className="text-lg font-semibold mb-2">Map Token Required</h3>
          <p className="text-muted-foreground mb-4">Please enter your Mapbox token to display the map</p>
          <input
            type="text"
            className="w-full max-w-md px-4 py-2 rounded-md border mb-4 bg-background"
            placeholder="Enter your Mapbox public token"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get a token at <a href="https://www.mapbox.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/80" />
        </>
      )}
    </div>
  );
};

export default ContactMap;
