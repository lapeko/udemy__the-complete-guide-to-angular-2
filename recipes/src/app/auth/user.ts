export interface DeserializedUser {
  id: string,
  email: string,
  _token: string,
  _tokenExpirationDate: Date,
}

export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {
  }

  get token() {
    if (this._tokenExpirationDate < new Date()) return null;
    return this._token;
  }

  get expiresIn() {
    return Math.max(0, this._tokenExpirationDate.getTime() - Date.now());
  }
}
