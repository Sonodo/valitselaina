import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

function getSQL() {
  return neon(process.env.DATABASE_URL!);
}

let tableInitialized = false;

async function ensureTable() {
  if (!tableInitialized) {
    const sql = getSQL();
    await sql`
      CREATE TABLE IF NOT EXISTS korkotutka_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        loan_type VARCHAR(50) NOT NULL,
        current_rate DECIMAL(5,2),
        loan_amount INTEGER,
        subscribed_at TIMESTAMP DEFAULT NOW(),
        is_active BOOLEAN DEFAULT TRUE
      )
    `;
    tableInitialized = true;
  }
}

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const VALID_LOAN_TYPES = ['asuntolaina', 'kulutusluotto'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, loanType, currentRate, loanAmount } = body;

    // Validate required fields
    if (!email || !loanType) {
      return NextResponse.json(
        { error: 'Sähköposti ja lainatyyppi ovat pakollisia kenttiä.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Tarkista sähköpostiosoitteen muoto.' },
        { status: 400 }
      );
    }

    // Validate loan type
    if (!VALID_LOAN_TYPES.includes(loanType)) {
      return NextResponse.json(
        { error: 'Tuntematon lainatyyppi.' },
        { status: 400 }
      );
    }

    // Validate rate if provided
    if (currentRate !== null && currentRate !== undefined) {
      const rate = Number(currentRate);
      if (isNaN(rate) || rate < 0 || rate > 30) {
        return NextResponse.json(
          { error: 'Tarkista korko — arvon pitää olla välillä 0–30 %.' },
          { status: 400 }
        );
      }
    }

    // Validate amount if provided
    if (loanAmount !== null && loanAmount !== undefined) {
      const amount = Number(loanAmount);
      if (isNaN(amount) || amount < 0 || amount > 10000000) {
        return NextResponse.json(
          { error: 'Tarkista lainasumma.' },
          { status: 400 }
        );
      }
    }

    await ensureTable();
    const sql = getSQL();

    // Rate limit: max 5 active subscriptions per email
    const existing = await sql`
      SELECT COUNT(*) as count FROM korkotutka_subscribers
      WHERE email = ${email.toLowerCase().trim()} AND is_active = TRUE
    `;

    if (Number(existing[0].count) >= 5) {
      return NextResponse.json(
        {
          error:
            'Tällä sähköpostilla on jo liian monta tilausta. Ota yhteyttä jos tarvitset apua.',
        },
        { status: 429 }
      );
    }

    // Insert subscription
    const normalizedEmail = email.toLowerCase().trim();
    const rate = currentRate !== null && currentRate !== undefined ? Number(currentRate) : null;
    const amount = loanAmount !== null && loanAmount !== undefined ? Number(loanAmount) : null;

    await sql`
      INSERT INTO korkotutka_subscribers (email, loan_type, current_rate, loan_amount)
      VALUES (${normalizedEmail}, ${loanType}, ${rate}, ${amount})
    `;

    return NextResponse.json({
      success: true,
      message: 'Tilaus onnistui! Saat ilmoituksen kun korkotilanne muuttuu.',
    });
  } catch (error) {
    console.error('Korkotutka subscribe error:', error);
    return NextResponse.json(
      { error: 'Jokin meni pieleen. Yritä myöhemmin uudelleen.' },
      { status: 500 }
    );
  }
}
