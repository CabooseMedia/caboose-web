'use client'

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export function AuthProtection({children}: {children: ReactNode}) {
    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const [childrenToRender, setChildrenToRender] = useState<ReactNode>(null);

    const excludedPaths = [
        "/api",
        "/auth",
        "/join",
        "/signin",
    ];

    useEffect(() => {
        let pathIsExcluded = excludedPaths.map((path) => {
            return pathname.startsWith(path);
        }).includes(true);
        if (pathIsExcluded) {
            setChildrenToRender(children);
        } else {
            if (status == "unauthenticated") {
                router.push("/signin");
                setChildrenToRender(
                    <div className='fixed inset-0 w-full h-full'>
                        <div className='flex flex-col justify-center items-center w-full h-full'>
                            <h1>
                                Redirecting to sign in...
                            </h1>
                        </div>
                    </div>
                );
            } else if (status == "loading") {
                setChildrenToRender(
                    <div className='fixed inset-0 w-full h-full'>
                        <div className='flex flex-col justify-center items-center w-full h-full'>
                            <h1>
                                Loading...
                            </h1>
                        </div>
                    </div>
                );
            } else {
                setChildrenToRender(children);
            }
        }
    }, [status, pathname]);
    
    return childrenToRender;
}