import { NextResponse } from "next/server";
import { users } from "@/app/lib/users";

export async function PUT(req) {
    try {
        const { email, displayName } = await req.json();

        if (!email || !displayName) {
            return NextResponse.json({ message: "Email and Display Name are required" }, { status: 400 });
        }

        // Find the specific user in the mocked array and update them
        const userIndex = users.findIndex((u) => u.email === email);
        if (userIndex === -1) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update the mocked database
        users[userIndex].name = displayName;

        return NextResponse.json({
            message: "Profile updated successfully",
            user: { name: displayName, email: users[userIndex].email }
        }, { status: 200 });

    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { message: "Something went wrong updating the profile" },
            { status: 500 }
        );
    }
}
