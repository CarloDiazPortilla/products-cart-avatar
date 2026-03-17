import jwt from "jsonwebtoken"

export class JwtAdapter {
  static async sign(payload: any, seed: string, duration: number | `${number}${'s' | 'm' | 'h' | 'd'}` = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, seed, { expiresIn: duration }, (error, token) => {
        if (error) return resolve(null);

        return resolve(token)
      })
    })
  }
  static async verify<T>(token: string, seed: string) {
    return new Promise((resolve) => {
      jwt.verify(token, seed, (error, decoded) => {
        if (error) return resolve(null);
        return resolve(decoded as T);
      })
    })
  }
}