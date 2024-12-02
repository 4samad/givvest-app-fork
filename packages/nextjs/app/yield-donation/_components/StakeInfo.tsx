interface StakeInfoProps {
  stakeInfo: any;
  onStartCooldown: () => void;
  onWithdrawAndDonate: () => void;
  isCooldownPending: boolean;
  isWithdrawPending: boolean;
  selectedCause: string;
  setIsModalOpen: (isOpen: boolean) => void;
  cooldownEnded: boolean;
}

export const StakeInfo = ({
  stakeInfo,
  onStartCooldown,
  onWithdrawAndDonate,
  isCooldownPending,
  isWithdrawPending,
  selectedCause,
  setIsModalOpen,
  cooldownEnded,
}: StakeInfoProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center mb-4">Your Stake</h2>
        <div className="stats flex flex-wrap">
          <div className="stat w-fit m-auto">
            <div className="stat-title">Deposited Amount</div>
            <div className="stat-value">{(Number(stakeInfo[0]) / 1e18).toFixed(2)} USDe</div>
          </div>
          <div className="stat w-fit m-auto">
            <div className="stat-title">Current Yield</div>
            <div className="stat-value text-success">{(Number(stakeInfo[2]) / 1e18).toFixed(2)} USDe</div>
          </div>
        </div>

        {!stakeInfo[3] ? (
          <div>
            <button className="btn btn-primary mt-4" onClick={onStartCooldown} disabled={isCooldownPending}>
              {isCooldownPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Starting Cooldown
                </>
              ) : (
                "Initiate Withdrawal (1-hour cooldown)"
              )}
            </button>
            <p className="mt-8 text-sm font-light text-gray-400 max-w-md m-auto">
              Once initiated, you can withdraw your deposit and donate the yield after the cooldown period.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            <div className="text-sm">
              {cooldownEnded
                ? "Cooldown completed. Ready to withdraw!"
                : `Cooldown ends: ${new Date(Number(stakeInfo[4]) * 1000).toLocaleString()}`}
            </div>
            <button
              className={`btn w-full max-w-md ${selectedCause ? "btn-neutral" : "btn-primary"}`}
              onClick={() => setIsModalOpen(true)}
              disabled={!cooldownEnded || isWithdrawPending}
            >
              {selectedCause ? `Selected Cause #${selectedCause}` : "Select a Cause to Donate Yield"}
            </button>
            <button
              className="btn btn-primary w-full max-w-md"
              onClick={onWithdrawAndDonate}
              disabled={!cooldownEnded || !selectedCause || isWithdrawPending}
            >
              {isWithdrawPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing
                </>
              ) : (
                "Withdraw & Donate Yield"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
