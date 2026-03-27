import { Validator } from "../utils/Validator";

class UserSubscription {
  private _userId!: string;
  private _subscriptionId!: string;
  private _isActive!: boolean;
  private _joinedAt!: Date;

  constructor(
    userId: string,
    subscriptionId: string,
    isActive: boolean,
    joinedAt: Date,
  ) {
    this.setUserId(userId);
    this.setSubscriptionId(subscriptionId);
    this.setIsActive(isActive);
    this.setJoinedAt(joinedAt);
  }

  public getUserId(): string {
    return this._userId;
  }

  public getSubscriptionId(): string {
    return this._subscriptionId;
  }

  public getIsActive(): boolean {
    return this._isActive;
  }

  public getJoinedAt(): Date {
    return this._joinedAt;
  }

  public setUserId(userId: string): void {
    this._userId = userId;
  }

  public setSubscriptionId(subscriptionId: string): void {
    this._subscriptionId = subscriptionId;
  }

  public setIsActive(isActive: boolean): void {
    this._isActive = isActive;
  }

  public setJoinedAt(joinedAt: Date): void {
    if (Validator.getInstance().datetime(joinedAt.toString())) {
      this._joinedAt = joinedAt;
    } else {
      throw new Error("Invalid date format: " + joinedAt);
    }
  }

  public toString(): string {
    return `UserSubscription { userId: ${this._userId}, subscriptionId: ${this._subscriptionId}, isActive: ${this._isActive}, joinedAt: ${this._joinedAt} }`;
  }

  public toJSON(): Object {
    return {
      userId: this._userId,
      subscriptionId: this._subscriptionId,
      isActive: this._isActive,
      joinedAt: this._joinedAt,
    };
  }
}

export { UserSubscription };
