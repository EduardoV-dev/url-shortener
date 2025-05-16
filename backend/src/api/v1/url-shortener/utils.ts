export interface CodeGenerator {
  generateByRange: (min: number, max: number) => string;
}

export class ShortCodeGenerator implements CodeGenerator {
  private generateIntByRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  public generateByRange: CodeGenerator['generateByRange'] = (min, max) => {
    const codeLength = this.generateIntByRange(min, max);
    const shortCode = nanoid(codeLength);
    return shortCode;
  }
}
