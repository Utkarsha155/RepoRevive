import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ProjectProvider } from "@/context/ProjectContext";
import { RequestProvider } from "@/context/RequestContext";
import { PaymentProvider } from "@/context/PaymentContext";
import { CertificateProvider } from "@/context/CertificateContext";
import { MessageProvider } from "@/context/MessageContext";
import { DashboardProvider } from "@/context/DashboardContext";
import { DeveloperProvider } from "@/context/DeveloperContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} bg-[#09090F] text-white antialiased`}
      >
        <AuthProvider>
          <ProjectProvider>
            <RequestProvider>
              <PaymentProvider>
                <CertificateProvider>
                  <MessageProvider>
                    <DashboardProvider>
                      <DeveloperProvider>
                        {children}
                      </DeveloperProvider>
                    </DashboardProvider>
                  </MessageProvider>
                </CertificateProvider>
              </PaymentProvider>
            </RequestProvider>
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}