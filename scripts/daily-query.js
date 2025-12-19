require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function queryTable() {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('id, name, status')
      .eq('status', 'published');

    if (error) {
      console.error('Error querying packages:', error);
      return;
    }

    console.log(`Found ${data.length} published packages:`);
    data.forEach(pkg => {
      console.log(`- ${pkg.name} (ID: ${pkg.id})`);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

queryTable();