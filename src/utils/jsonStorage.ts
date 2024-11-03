import fs from "fs";

type Key = string | number;

export default class JsonStorage<Data> {
  // private 변수
  // 외부에서 접근 X -> Default Value로 빈 Object
  #values: Record<Key, Data> = {};

  constructor(private readonly filename: string) {
    // constructor가 실행하면서 load 함수를 실행
    this.load();
  }

  load() {
    try {
      const data = fs.readFileSync(this.filename, "utf-8");
      this.#values = JSON.parse(data) ?? {};
    } catch (e) {
      console.error("Failed to load data from file", e);
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.#values));
    } catch (e) {
      console.error("Failed to save data to file", e);
    }
  }

  get(key: Key): Data | undefined {
    return this.#values[key];
  }

  set(key: Key, value: Data) {
    this.#values[key] = value;
    this.save();
  }

  getAll() {
    return this.#values;
  }
}
