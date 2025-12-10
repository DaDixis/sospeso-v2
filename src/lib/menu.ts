// Menu data fetcher from Google Sheets
// Fetches at BUILD TIME only - no runtime performance impact

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

// Your published Google Sheet CSV URL
// To get this: Google Sheet > File > Share > Publish to web > Select CSV > Publish
const GOOGLE_SHEET_CSV_URL = import.meta.env.GOOGLE_SHEET_CSV_URL || '';

/**
 * Fetches menu data from Google Sheets at build time
 * Sheet columns expected: category, name, price, description (optional)
 */
export async function fetchMenuFromSheet(): Promise<MenuCategory[]> {
  if (!GOOGLE_SHEET_CSV_URL) {
    console.warn('GOOGLE_SHEET_CSV_URL not set, using fallback menu data');
    return getFallbackMenu();
  }

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    
    if (!response.ok) {
      console.error('Failed to fetch menu from Google Sheets:', response.status);
      return getFallbackMenu();
    }

    const csvText = await response.text();
    return parseCSVToMenu(csvText);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return getFallbackMenu();
  }
}

/**
 * Parse CSV text into menu structure
 */
function parseCSVToMenu(csv: string): MenuCategory[] {
  const lines = csv.trim().split('\n');
  
  // Skip header row
  const dataLines = lines.slice(1);
  
  const categoryMap = new Map<string, MenuItem[]>();
  const categoryOrder: string[] = [];

  for (const line of dataLines) {
    // Parse CSV line (handles quoted values with commas)
    const columns = parseCSVLine(line);
    
    if (columns.length < 3) continue;

    const [category, name, price, description] = columns;
    
    if (!category || !name) continue;

    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
      categoryOrder.push(category);
    }

    categoryMap.get(category)!.push({
      name: name.trim(),
      price: price.trim(),
      description: description?.trim() || undefined,
    });
  }

  // Convert to array maintaining order
  return categoryOrder.map(category => ({
    category,
    items: categoryMap.get(category) || [],
  }));
}

/**
 * Parse a single CSV line, handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

/**
 * Fallback menu data (your current menu)
 * Used when Google Sheet is not configured or unavailable
 */
function getFallbackMenu(): MenuCategory[] {
  return [
    {
      category: 'Caffè',
      items: [
        { name: 'Espresso', price: '25/35 kr' },
        { name: 'Macchiato', price: '30/40 kr' },
        { name: 'Americano', price: '35 kr' },
        { name: 'Cappuccino', price: '38 kr' },
        { name: 'Latte Macchiato', price: '46 kr' },
        { name: 'Caffè Latte', price: '50 kr' },
        { name: 'Espressino', price: '38 kr' },
      ],
    },
    {
      category: 'Cold Drinks',
      items: [
        { name: 'Sanpellegrino', price: '40 kr' },
        { name: 'Yoga Juice', price: '32 kr' },
        { name: 'Lurisia', price: '45 kr' },
      ],
    },
    {
      category: 'Juice',
      items: [
        { name: 'Fresh Pressad', price: '45 kr' },
        { name: 'Orange Juice', price: '45 kr' },
      ],
    },
    {
      category: 'Te',
      items: [
        { name: 'Te', price: '35 kr' },
      ],
    },
    {
      category: 'Gelato',
      items: [
        { name: 'Gelato', price: '35 kr' },
      ],
    },
    {
      category: 'Cioccolata Calda',
      items: [
        { name: 'Cioccolata Calda', price: '45 kr' },
      ],
    },
  ];
}
