import dbConnect from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

// import { db } from '@/lib/db';

export async function POST(req: Request) {
 
  const body = await req.json()

  const {
    name,
    email,
  } = body

  if (!name || !email) {
    return new NextResponse('name and email is required', { status: 404 })
  }

  try {    
    await dbConnect();

    const newUser = new User({
      name,
      email,
    });
    const user = await newUser.save()

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
