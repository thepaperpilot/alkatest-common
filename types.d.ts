// At least one export must be explicit so that this file is loaded as a module
export type State =
    | string
    | number
    | boolean
    | ContentPack
    | { [key: string]: State }
    | { [key: number]: State };

interface ContentPack {
    display: string;
    eventListeners?: {
        [x: string]: ArrayBlock<ActionBlock>;
    };
    nodes?: {
        [x: string]: NodeType;
    };
    items?: {
        [x: string]: ItemType;
    };
    types?: {
        [x: string]: TypeType;
    };
    [x: string]: x extends "display" ? string : Record<string, State>;
}

interface NodeType {
    display: StringBlock;
    size: SizeBlock;
    draggable?: BooleanBlock;
    data?: DictionaryBlock<TypeBlock>;
    inventory?: Inventory;
    actions?: DictionaryBlock<NodeAction>;
    place?: ArrayBlock<ActionBlock>;
}

interface ItemType {
    display: StringBlock;
    node?: StringBlock;
    maxStackSize?: NumberBlock;
}

interface TypeType {
    data?: {
        [x: string]: TypeBlock;
    };
    methods?: {
        [x: string]: MethodTypeBlock;
    };
    properties?: {
        [x: string]: TypeBlock & { value: StateBlock };
    };
}

interface Inventory {
    slots: NumberBlock;
    canPlayerExtract?: BooleanBlock;
    canPlayerInsert?: BooleanBlock;
}

interface NodeAction {
    display: StringBlock;
    duration: NumberBlock;
    tooltip?: StringBlock;
    cost?: DictionaryBlock<ItemStackBlock>;
    run: ArrayBlock<ActionBlock>;
}

interface NodeActionType {
    _type: "action";
    internal?: BooleanBlock;
}

interface MethodBlock {
    _type: "method";
    object: StringBlock;
    method: StringBlock;
    params?: DictionaryBlock;
}

interface PropertyBlock {
    _type: "property";
    object: StringBlock;
    property: StringBlock;
}

interface GetObjectBlock {
    _type: "getObject";
    id: StringBlock;
}

interface TernaryBlock {
    _type: "ternary";
    condition: BooleanBlock;
    true: StateBlock;
    false: StateBlock;
}

type ReferenceBlock = MethodBlock | PropertyBlock | GetObjectBlock | TernaryBlock;

interface MethodTypeBlock {
    params?: Record<string, TypeBlock>;
    returns?: TypeBlock;
    run: ArrayBlock<ActionBlock>;
}

interface ObjectTypeBlock {
    _type: "object";
    properties: Record<string, TypeBlock>;
    internal?: boolean;
}

interface MapBlock<T, S> {
    _type: "map";
    array: ArrayBlock<T>;
    value: S;
}

interface FilterBlock<T> {
    _type: "filter";
    array: ArrayBlock<T>;
    condition: BooleanBlock;
}

interface KeysBlock<T> {
    _type: "keys";
    dictionary: DictionaryBlock<T>;
}

interface ValuesBlock<T> {
    _type: "values";
    dictionary: DictionaryBlock<T>;
}

type ArrayBlock<T = StateBlock> =
    | MapBlock<unknown, T>
    | FilterBlock<T>
    | KeysBlock<T>
    | ValuesBlock<T>
    | ReferenceBlock
    | T[];

interface ArrayTypeBlock {
    _type: "array";
    elementType: TypeBlock;
    internal?: boolean;
}

interface CreateDictionaryBlock<T> {
    _type: "createDictionary";
    entries: ArrayBlock<EntryBlock<T>>;
}

interface EntryBlock<T = State> {
    _type: "entry";
    key: StringBlock;
    value: T;
}

type DictionaryBlock<T = StateBlock> =
    | CreateDictionaryBlock<T>
    | ReferenceBlock
    | Record<string, T>;

interface DictionaryTypeBlock {
    _type: "dictionary";
    keyType: TypeBlock;
    valueType: TypeBlock;
    internal?: boolean;
}

type StateBlock =
    | StringBlock
    | NumberBlock
    | BooleanBlock
    | DictionaryBlock
    | ArrayBlock
    | ReferenceBlock
    | State;

interface ConcatBlock {
    _type: "concat";
    operands: ArrayBlock<StringBlock>;
}

type StringBlock = ConcatBlock | ReferenceBlock | string;

interface StringTypeBlock {
    _type: "string";
    default?: StringBlock;
    internal?: BooleanBlock;
}

interface EqualsBlock {
    _type: "equals";
    operands: ArrayBlock<StateBlock>;
}

interface NotEqualsBlock {
    _type: "notEquals";
    operands: ArrayBlock<StateBlock>;
}

interface LessThanBlock {
    _type: "lessThan";
    operands: ArrayBlock<NumberBlock>;
}

interface GreaterThanBlock {
    _type: "greaterThan";
    operands: ArrayBlock<NumberBlock>;
}

interface LessThanOrEqualBlock {
    _type: "lessThanOrEqual";
    operands: ArrayBlock<NumberBlock>;
}

interface GreaterThanOrEqualBlock {
    _type: "greaterThanOrEqual";
    operands: ArrayBlock<NumberBlock>;
}

interface ObjectExistsBlock {
    _type: "objectExists";
    object: StringBlock;
}

interface PropertyExistsBlock {
    _type: "propertyExists";
    object: StringBlock;
    property: StringBlock;
}

type BooleanBlock =
    | EqualsBlock
    | NotEqualsBlock
    | LessThanBlock
    | GreaterThanBlock
    | LessThanOrEqualBlock
    | GreaterThanOrEqualBlock
    | ObjectExistsBlock
    | PropertyExistsBlock
    | ReferenceBlock
    | boolean;

interface BooleanTypeBlock {
    _type: "boolean";
    default?: BooleanBlock;
    internal?: boolean;
}

interface AdditionBlock {
    _type: "addition";
    operands: ArrayBlock<NumberBlock>;
}

interface SubtractionBlock {
    _type: "subtraction";
    operands: ArrayBlock<NumberBlock>;
}

interface RandomBlock {
    _type: "random";
    min: NumberBlock;
    max: NumberBlock;
}

interface RandomIntBlock {
    _type: "randomInt";
    min: NumberBlock;
    max: NumberBlock;
}

type NumberBlock =
    | AdditionBlock
    | SubtractionBlock
    | RandomBlock
    | RandomIntBlock
    | ReferenceBlock
    | number;

interface NumberTypeBlock {
    _type: "number";
    default?: NumberBlock;
    internal?: boolean;
}

interface BranchBlock {
    _type: "branch";
    condition: BooleanBlock;
    true?: ArrayBlock<ActionBlock>;
    false?: ArrayBlock<ActionBlock>;
}

interface ForEachBlock {
    _type: "forEach";
    array: ArrayBlock;
    forEach: ArrayBlock<ActionBlock>;
}

interface RepeatBlock {
    _type: "repeat";
    iterations: NumberBlock;
    run: ArrayBlock<ActionBlock>;
}

interface WaitBlock {
    _type: "wait";
    node?: StringBlock;
    duration: NumberBlock;
}

interface AddItemsToInventoryBlock {
    _type: "addItemsToInventory";
    node: StringBlock;
    items: ArrayBlock<ItemStackBlock>;
    overflow?: "destroy";
}

interface SetDataBlock {
    _type: "setData";
    object: StringBlock;
    key: StringBlock;
    value: StateBlock;
}

interface AddNodeBlock {
    _type: "addNode";
    nodeType: StringBlock;
    pos: PositionBlock;
    data?: StateBlock;
}

interface RemoveNodeBlock {
    _type: "removeNode";
    node: StringBlock;
}

interface EventBlock {
    _type: "event";
    event: StringBlock;
    data?: StateBlock;
}

interface ErrorBlock {
    _type: "error";
    message: StringBlock;
}

type ActionBlock =
    | BranchBlock
    | ForEachBlock
    | RepeatBlock
    | WaitBlock
    | AddItemsToInventoryBlock
    | SetDataBlock
    | AddNodeBlock
    | RemoveNodeBlock
    | EventBlock
    | ErrorBlock
    | { _type: "@return"; value?: StateBlock }
    | { _type: "@break" };

interface ReferenceTypeBlock {
    _type: "id";
    of: string;
    internal?: boolean;
}

type ItemStackBlock =
    | {
          item: StringBlock;
          quantity: NumberBlock;
      }
    | ReferenceBlock;

interface ItemStackTypeBlock {
    _type: "itemStack";
    internal?: boolean;
}

type TypeBlock =
    | string
    | DictionaryTypeBlock
    | ArrayTypeBlock
    | ObjectTypeBlock
    | NumberTypeBlock
    | BooleanTypeBlock
    | StringTypeBlock
    | ReferenceTypeBlock
    | ItemStackTypeBlock
    | NodeActionType;

type PositionBlock =
    | {
          x: NumberBlock;
          y: NumberBlock;
      }
    | ReferenceBlock;

type SizeBlock =
    | NumberBlock
    | { width: number | NumberBlock; height: NumberBlock }
    | ReferenceBlock;

type ContentPackContext = Record<
    string,
    { _type: Record<string, TypeBlock>; data: Record<string, StateBlock> }
>;

interface GameState {
    layers: {
        world: {
            nodes: NodeState[];
        };
    };
}

interface NodeState {
    pos: {
        x: number;
        y: number;
    };
    _type: string;
    data?: State;
}

interface ClientRoomData {
    name: string;
    host: string;
    hasPassword: boolean;
    numContentPacks: number;
}

interface ServerToClientEvents {
    "server version": (semver: string) => void;
    info: (message: string) => void;
    "set rooms": (rooms: ClientRoomData[]) => void;
    "set content packs": (contentPacks: (string | ContentPack)[]) => void;
    "set game state": (state: GameState) => void;
    "set nicknames": (nicknames: Record<string, string>) => void;
    "set cursor position": (user: string, pos: { x: number; y: number }) => void;
    chat: (user: string, message: string) => void;
    "move node": (node: string, pos: { x: number; y: number }) => void;
    "connect nodes": (
        startNode: string,
        outputIndex: number,
        endNode: string,
        inputIndex: number
    ) => void;
    "joined room": (room: string, isHost: boolean) => void;
    "left room": () => void;
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
    "set nickname": (nickname: string) => void;
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
