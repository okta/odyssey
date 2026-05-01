import { vol, type Volume } from "memfs";
import { execSync } from "node:child_process";
import { beforeEach, vi } from "vitest";

vi.mock(
  "node:fs/promises",
  async () => ((await vi.importActual("memfs")).fs as Volume).promises,
);

vi.mock("node:child_process", async () => ({
  ...(await vi.importActual("node:child_process")),
  execSync: vi.fn(),
}));

beforeEach(() => {
  vol.reset();
  vi.mocked(execSync).mockReturnValue("/repo");
  vi.spyOn(process, "cwd");
  vi.spyOn(process, "exit").mockImplementation((code) => {
    throw new Error(`process.exit: ${code}`);
  });
});
