import type { TemperatureUnit } from '@/store';

// converte a temperatura conforme a unidade
export function formatTemperature(celsius: number, unit: TemperatureUnit): string {
  if (unit === 'fahrenheit') {
    const fahrenheit = (celsius * 9/5) + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

// formata a velocidade do vento
export function formatWindSpeed(kph: number, unit: TemperatureUnit): string {
  if (unit === 'fahrenheit') {
    const mph = kph * 0.621371;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(kph)} km/h`;
}

// formata a data
export function formatDate(dateString: string, language: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

// formata a hora
export function formatTime(dateString: string, language: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(language === 'pt' ? 'pt-PT' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// formata a hora simples (só a hora)
export function formatHour(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// obtém o dia da semana abreviado
export function getWeekday(dateString: string, language: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', {
    weekday: 'short',
  });
}

// verifica se é hoje
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

// gera um id único
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// obtém o ícone do tempo
export function getWeatherIcon(iconUrl: string, isDay: number): string {
  const iconCode = iconUrl.split('/').pop();
  const period = isDay ? 'day' : 'night';
  return `https://cdn.weatherapi.com/weather/128x128/${period}/${iconCode}`;
}

// obtém a cor conforme a temperatura
export function getTemperatureColor(temp: number): string {
  if (temp >= 35) return 'text-red-500';
  if (temp >= 30) return 'text-orange-500';
  if (temp >= 25) return 'text-amber-500';
  if (temp >= 20) return 'text-yellow-500';
  if (temp >= 15) return 'text-lime-500';
  if (temp >= 10) return 'text-cyan-500';
  if (temp >= 5) return 'text-blue-400';
  return 'text-blue-600';
}

// obtém o gradiente conforme a temperatura, hora e tema
export function getBackgroundGradient(
  temp: number | null, 
  isDay: boolean, 
  theme: 'light' | 'dark' | 'auto' = 'auto'
): string {
  // tema escuro forçado
  if (theme === 'dark') {
    if (temp === null) return 'from-slate-900 via-slate-950 to-black';
    if (temp >= 30) return 'from-slate-900 via-red-950 to-slate-950';
    if (temp >= 20) return 'from-slate-900 via-indigo-950 to-slate-950';
    if (temp >= 10) return 'from-slate-900 via-blue-950 to-slate-950';
    return 'from-slate-900 via-cyan-950 to-slate-950';
  }
  
  // tema claro forçado
  if (theme === 'light') {
    if (temp === null) return 'from-sky-200 via-blue-200 to-indigo-200';
    if (temp >= 35) return 'from-orange-200 via-amber-100 to-yellow-100';
    if (temp >= 30) return 'from-amber-200 via-yellow-100 to-orange-100';
    if (temp >= 25) return 'from-yellow-100 via-amber-100 to-rose-100';
    if (temp >= 20) return 'from-sky-200 via-blue-100 to-indigo-100';
    if (temp >= 15) return 'from-blue-200 via-sky-100 to-cyan-100';
    if (temp >= 10) return 'from-blue-300 via-blue-200 to-indigo-200';
    if (temp >= 5) return 'from-blue-300 via-indigo-200 to-purple-200';
    return 'from-blue-400 via-indigo-300 to-slate-300';
  }
  
  // tema automático - usa dia/noite
  if (temp === null) {
    return 'from-slate-800 via-slate-900 to-slate-950';
  }
  
  if (!isDay) {
    if (temp > 25) return 'from-indigo-900 via-purple-900 to-slate-900';
    return 'from-slate-800 via-indigo-900 to-slate-950';
  }
  
  if (temp >= 35) return 'from-red-500 via-orange-500 to-yellow-400';
  if (temp >= 30) return 'from-orange-500 via-amber-500 to-yellow-400';
  if (temp >= 25) return 'from-amber-400 via-orange-400 to-rose-400';
  if (temp >= 20) return 'from-sky-400 via-blue-400 to-indigo-500';
  if (temp >= 15) return 'from-blue-400 via-sky-500 to-cyan-400';
  if (temp >= 10) return 'from-blue-500 via-blue-600 to-indigo-600';
  if (temp >= 5) return 'from-blue-600 via-indigo-600 to-purple-600';
  return 'from-blue-700 via-indigo-700 to-slate-800';
}

// obtém a descrição da qualidade do ar
export function getAqiDescription(aqi: number, language: string): { text: string; color: string } {
  const descriptions = {
    pt: ['Boa', 'Moderada', 'Má para sensíveis', 'Má', 'Muito má', 'Perigosa'],
    en: ['Good', 'Moderate', 'Unhealthy for sensitive', 'Unhealthy', 'Very unhealthy', 'Hazardous'],
  };
  const colors = ['text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500', 'text-purple-500', 'text-rose-900'];
  
  const index = Math.min(aqi - 1, 5);
  const lang = language === 'pt' ? 'pt' : 'en';
  
  return {
    text: descriptions[lang][index] || descriptions[lang][0],
    color: colors[index] || colors[0],
  };
}

// obtém a fase da lua traduzida
export function getMoonPhase(phase: string, language: string): string {
  const phases: Record<string, { pt: string; en: string }> = {
    'New Moon': { pt: 'Lua Nova', en: 'New Moon' },
    'Waxing Crescent': { pt: 'Lua Crescente', en: 'Waxing Crescent' },
    'First Quarter': { pt: 'Quarto Crescente', en: 'First Quarter' },
    'Waxing Gibbous': { pt: 'Gibosa Crescente', en: 'Waxing Gibbous' },
    'Full Moon': { pt: 'Lua Cheia', en: 'Full Moon' },
    'Waning Gibbous': { pt: 'Gibosa Minguante', en: 'Waning Gibbous' },
    'Last Quarter': { pt: 'Quarto Minguante', en: 'Last Quarter' },
    'Waning Crescent': { pt: 'Lua Minguante', en: 'Waning Crescent' },
  };
  
  const lang = language === 'pt' ? 'pt' : 'en';
  return phases[phase]?.[lang] || phase;
}
