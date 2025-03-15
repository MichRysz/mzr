import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Admin Supabase Client (tylko backend)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Pobieramy ID użytkownika z URL

    if (!id) {
      return NextResponse.json({ error: 'Brak ID użytkownika' }, { status: 400 });
    }

    // Usuwamy użytkownika z Supabase Auth
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Konto zostało usunięte.' }, { status: 200 });
  } catch (error) {
    console.error('Błąd serwera:', error);
    return NextResponse.json({ error: 'Wystąpił błąd serwera' }, { status: 500 });
  }
}
