import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin to handle figma:asset imports
const figmaAssetPlugin = () => ({
  name: 'figma-asset-resolver',
  resolveId(id: string) {
    if (id.startsWith('figma:asset/')) {
      return id;
    }
  },
  load(id: string) {
    if (id.startsWith('figma:asset/')) {
      const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E`;
      return `export default "${placeholderSvg}"`;
    }
  }
});

export default defineConfig({
  plugins: [react(), figmaAssetPlugin()],
})
