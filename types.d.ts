interface ContentPack {
    nodeTypes: {
        [x: string]: {
            name: string;
        }
    }
}

interface GameState {
    layers: {
        world: {
            nodes: {
                position: {
                    x: number;
                    y: number;
                },
                type: string;
                data: unknown;
            }[];
        }
    }
}
