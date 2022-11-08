/* eslint-disable @typescript-eslint/no-explicit-any */
// At least one export must be explicit so that this file is loaded as a module
export interface ContentPack {
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
    [x: string]: x extends "display" ? string : Record<string, any>;
}

interface NodeType {
    display: ProcessedComputable<StringBlock>;
    size: ProcessedComputable<SizeBlock>;
    draggable?: ProcessedComputable<BooleanBlock>;
    data?: ProcessedComputable<DictionaryBlock<TypeBlock>>;
    inventory?: ProcessedComputable<Inventory>;
    actions?: ProcessedComputable<DictionaryBlock<NodeAction>>;
    place?: ProcessedComputable<ArrayBlock<ActionBlock>>;
}

interface ItemType {
    display: ProcessedComputable<StringBlock>;
    node?: ProcessedComputable<StringBlock>;
    maxStackSize?: ProcessedComputable<NumberBlock>;
}

interface TypeType {
    data?: ProcessedComputable<Record<string, TypeBlock>>;
    methods?: ProcessedComputable<Record<string, MethodTypeBlock>>;
    properties?: ProcessedComputable<Record<string, TypeBlock & { value: any }>>;
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
    object: ObjectBlock;
    method: StringBlock;
    params?: DictionaryBlock;
}

interface PropertyBlock {
    _type: "property";
    object: ObjectBlock;
    property: StringBlock;
}

interface GetContextBlock {
    _type: "getContext";
    id: StringBlock;
}

interface TernaryBlock {
    _type: "ternary";
    condition: BooleanBlock;
    true: any;
    false: any;
}

type ReferenceBlock = MethodBlock | PropertyBlock | GetContextBlock | TernaryBlock;

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

type ArrayBlock<T = any> =
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

interface EntryBlock<T = any> {
    key: StringBlock;
    value: T;
}

type DictionaryBlock<T = any> = CreateDictionaryBlock<T> | ReferenceBlock | Record<string, T>;

interface DictionaryTypeBlock {
    _type: "dictionary";
    keyType: TypeBlock;
    valueType: TypeBlock;
    internal?: boolean;
}

type ObjectBlock = (object & { _type: never }) | ReferenceBlock;

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
    operands: ArrayBlock<any>;
}

interface NotEqualsBlock {
    _type: "notEquals";
    operands: ArrayBlock<any>;
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

interface ContextExistsBlock {
    _type: "contextExists";
    object: StringBlock;
}

interface PropertyExistsBlock {
    _type: "propertyExists";
    object: ObjectBlock;
    property: StringBlock;
}

interface AllBlock {
    _type: "all";
    operands: ArrayBlock<BooleanBlock>;
}

interface AnyBlock {
    _type: "any";
    operands: ArrayBlock<BooleanBlock>;
}

interface NoneBlock {
    _type: "none";
    operands: ArrayBlock<BooleanBlock>;
}

type BooleanBlock =
    | EqualsBlock
    | NotEqualsBlock
    | LessThanBlock
    | GreaterThanBlock
    | LessThanOrEqualBlock
    | GreaterThanOrEqualBlock
    | ContextExistsBlock
    | PropertyExistsBlock
    | AllBlock
    | AnyBlock
    | NoneBlock
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
    object: ObjectBlock;
    key: StringBlock;
    value: any;
}

interface AddNodeBlock {
    _type: "addNode";
    nodeType: StringBlock;
    pos: PositionBlock;
    data?: any;
}

interface RemoveNodeBlock {
    _type: "removeNode";
    node: StringBlock;
}

interface EventBlock {
    _type: "event";
    event: StringBlock;
    data?: any;
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
    | { _type: "@return"; value?: any }
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
    { _type: Record<string, TypeBlock>; data: Record<string, any> }
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
    data?: any;
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
