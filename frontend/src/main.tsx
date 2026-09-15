import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "@/domains/authentication/_feat";
import {queryClient as ReactQueryClient} from "@/_config";
import {RegisterRoutes} from "@/shared/_routes";
import {IPGeolocationContextProvider, ThemeProvider} from "@/shared/_feat";
import {Bounce, ToastContainer} from "react-toastify";

const router = createBrowserRouter(RegisterRoutes);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={ReactQueryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <IPGeolocationContextProvider>
                        <RouterProvider router={router}/>

                        <ToastContainer
                            position="bottom-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Bounce}
                        />
                    </IPGeolocationContextProvider>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
)
