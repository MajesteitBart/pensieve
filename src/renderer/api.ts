import { createRendererIpc } from "./create-renderer-ipc";
import type { mainApi as mainApiBackend } from "../main/ipc/main-api";
import type { modelsApi as modelsApiBackend } from "../main/ipc/models-api";
import type { historyApi as historyApiBackend } from "../main/ipc/history-api";

export const mainApi = createRendererIpc<typeof mainApiBackend>("main");
export const modelsApi = createRendererIpc<typeof modelsApiBackend>("models");
export const historyApi =
  createRendererIpc<typeof historyApiBackend>("history");
