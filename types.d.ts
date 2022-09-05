interface ContentPack {
    nodeTypes: {
        [x: string]: {
            name: string;
        };
    };
}

interface GameState {
    layers: {
        world: {
            nodes: {
                position: {
                    x: number;
                    y: number;
                };
                type: string;
                data: unknown;
            }[];
        };
    };
}

interface ClientRoomData {
    name: string;
    host: string;
    hasPassword: boolean;
}

interface ServerToClientEvents {
    "server version": (semver: string) => void;
    info: (message: string) => void;
    "set rooms": (rooms: ClientRoomData[]) => void;
    "set content packs": (contentPacks: (string | ContentPack)[]) => void;
    "set game state": (state: GameState) => void;
    "set nicknames": (nicknames: string[]) => void;
    "set cursor position": (nickname: string, pos: { x: number; y: number }) => void;
    chat: (nickname: string, message: string) => void;
    "move node": (node: string, pos: { x: number; y: number }) => void;
    "connect nodes": (
        startNode: string,
        outputIndex: number,
        endNode: string,
        inputIndex: number
    ) => void;
}

interface ClientToServerEvents {
    "get rooms": () => void;
    "create room": (options: {
        name: string;
        contentPacks: (string | ContentPack)[];
        state: GameState;
        nickname: string;
        password?: string;
        privateRoom?: boolean;
    }) => void;
    "connect to room": (name: string, password: string | undefined, nickname: string) => void;
    "leave room": () => void;
    "kick user": (id: string) => void;
    "set content packs": (contentPacks: (string | ContentPack)[]) => void;
    "set game state": (state: GameState) => void;
    "set cursor position": (pos: { x: number; y: number }) => void;
    chat: (message: string) => void;
    "move node": (node: string, pos: { x: number; y: number }) => void;
    "connect nodes": (
        startNode: string,
        outputIndex: number,
        endNode: string,
        inputIndex: number
    ) => void;
    accept: (state: GameState) => void;
    reject: (id: string, state: GameState) => void;
}
