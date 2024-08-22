"use client"

import { Poppins } from 'next/font/google'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BrainIcon } from 'lucide-react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import { io } from 'socket.io-client'
import { io as ClientIO } from "socket.io-client"

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const headingFont = localFont({
  src: './../../assets/fonts/font.woff2',
})

export default function Home() {
  const [values, setValues] = useState<any[]>([]);

  // var socket: any;
  // socket = io("http://localhost:3000");

  // useEffect(() => {
  //   console.log('ENTROU')
  //   socket.on("123", (data: any) => {
  //     setValues((pre) => [...pre, data]);
  //   });
  // }, [socket]);

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  console.log(values)

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("123", (data: any) => {
      setValues((pre) => [...pre, JSON.parse(data)]);
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }
  }, []);  

  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn('flex items-center justify-center flex-col', headingFont.className)}>
               
        {
          values && values.map((v: any, i) => (
            <div key={i} className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
              <BrainIcon className="h-6 w-6 mr-2" />
              {v.content}
            </div> 
            )
          )
        }
      </div>
      <div
        className={cn(
          'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
          textFont.className,
        )}
      >
     
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/auth/register">Get Reporte.me Cards for free</Link>
      </Button>
    </div>
  )
}


