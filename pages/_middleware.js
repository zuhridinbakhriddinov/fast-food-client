import {NextRequest, NextResponse} from "next/server";

export default async function middleware(req) {
    const accessToken = await typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
    console.log('ACCESS TOKEN: ' + accessToken)
    const url = req.url;
    if (url.includes("/cook")) {
        console.log("MIDDLEWARE IS WORKING!!!!")
        if (accessToken !== null) {
            if (role === 'COOK') {
                return NextResponse.redirect('/cook')
            } else {
                return NextResponse.redirect('/notFound')
            }
        }
    }

    return NextResponse.next();
}