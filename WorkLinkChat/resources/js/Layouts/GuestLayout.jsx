import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="
            min-h-screen
            flex flex-col
            items-center
            justify-center
            bg-gray-100 dark:bg-gray-900
            px-4
        ">
            {/* Logo Section */}
            <div className="mb-6 flex justify-center">
                <div className="
                    rounded-full
                    p-4
                    bg-white/5
                ">
                    <ApplicationLogo
                        className="
                            h-24 sm:h-28
                            w-auto
                            select-none
                            drop-shadow-[0_0_20px_rgba(99,102,241,0.9)]
                        "
                    />
                </div>
            </div>

            {/* Auth Card */}
            <div
                className="
                    w-full max-w-md
                    bg-white dark:bg-gray-800
                    rounded-xl
                    shadow-xl
                    px-6 py-6
                "
            >
                {children}
            </div>
        </div>
    );
}
