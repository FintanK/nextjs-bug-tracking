import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createBugSchema } from "./createBugSchema";

export async function GET() {
    try {
        const users = await prisma.bug.findMany();
        return NextResponse.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch users' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      } finally {
        await prisma.$disconnect();
      }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createBugSchema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const newBug = await prisma.bug.create({
        data: { title: body.title, description: body.description }
    });

    return NextResponse.json(newBug, { status: 201 });

}