interface StakeFormProps {
  amount: string;
  setAmount: (amount: string) => void;
  onDeposit: () => void;
  isButtonDisabled: boolean;
  isApprovePending: boolean;
  isDepositPending: boolean;
  isProcessing: boolean;
}

export const StakeForm = ({
  amount,
  setAmount,
  onDeposit,
  isButtonDisabled,
  isApprovePending,
  isDepositPending,
  isProcessing,
}: StakeFormProps) => {
  return (
    <div className="card bg-base-100 shadow-xl max-w-full">
      <div className="card-body">
        <h2 className="card-title justify-center mb-4">Start Yield Giving</h2>
        <div className="form-control w-full max-w-md mx-auto">
          <label className="label">
            <span className="label-text">Amount to Deposit (USDe)</span>
          </label>
          <div className="flex flex-col gap-4">
            <label className="input input-bordered inline-flex items-center gap-1">
              <span>$</span>
              <input
                type="text"
                placeholder="Enter amount"
                className="grow bg-transparent"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </label>
            <button className="btn btn-primary w-full" onClick={onDeposit} disabled={isButtonDisabled}>
              {isApprovePending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Approving
                </>
              ) : isDepositPending || isProcessing ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Depositing
                </>
              ) : (
                "Deposit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
