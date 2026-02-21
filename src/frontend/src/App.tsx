import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import AnalysisPage from './pages/AnalysisPage';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AnalysisPage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
