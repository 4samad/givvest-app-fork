import { useState } from "react";
import { CauseSelectionModal } from "./CauseSelectionModal";
import { StakeForm } from "./StakeForms";
import { StakeInfo } from "./StakeInfo";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function StakeSection() {
  const [amount, setAmount] = useState("");
  const [selectedCause, setSelectedCause] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: yieldDonationContract, isLoading: isContractLoading } = useDeployedContractInfo("YieldDonation");

  const {
    data: stakeInfo,
    isLoading: isStakeInfoLoading,
    error: stakeError,
    refetch: refetchStakeInfo,
  } = useScaffoldReadContract({
    contractName: "YieldDonation",
    functionName: "getStakeInfo",
    args: [address],
  });

  const { writeContractAsync: deposit, isPending: isDepositPending } = useScaffoldWriteContract("YieldDonation");

  const { writeContractAsync: approveUsde, isPending: isApprovePending } = useScaffoldWriteContract("USDe");

  const { writeContractAsync: startCooldown, isPending: isCooldownPending } = useScaffoldWriteContract("YieldDonation");

  const { writeContractAsync: withdrawAndDonate, isPending: isWithdrawPending } =
    useScaffoldWriteContract("YieldDonation");

  const handleDeposit = async () => {
    if (!amount || !yieldDonationContract?.address || !isConnected) return;

    setIsProcessing(true);
    try {
      const amountInWei = parseEther(amount);

      await approveUsde({
        functionName: "approve",
        args: [yieldDonationContract.address, amountInWei],
      });

      await deposit(
        {
          functionName: "deposit",
          args: [amountInWei],
        },
        {
          onBlockConfirmation: async txnReceipt => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
            setIsProcessing(false);
            setAmount("");
            await refetchStakeInfo();
          },
        },
      );
    } catch (err) {
      console.error("Failed to deposit:", err);
      setIsProcessing(false);
    }
  };

  const handleStartCooldown = async () => {
    try {
      await startCooldown({
        functionName: "startCooldown",
      });
      await refetchStakeInfo();
    } catch (err) {
      console.error("Failed to start cooldown:", err);
    }
  };

  const handleWithdrawAndDonate = async () => {
    try {
      await withdrawAndDonate({
        functionName: "withdrawAndDonate",
        args: [BigInt(selectedCause)],
      });
      await refetchStakeInfo();
    } catch (err) {
      console.error("Failed to withdraw and donate:", err);
    }
  };

  const isLoading = isStakeInfoLoading || isContractLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-base-200 rounded-box mb-8">
        <div className="loading loading-spinner loading-lg text-white"></div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-base-200 rounded-box mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Connect Wallet to Start</h2>
            <p className="text-base-content/70">You need to connect your wallet to use this feature</p>
          </div>
        </div>
      </div>
    );
  }

  if (stakeError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-base-200 rounded-box mb-8">
        <div className="alert alert-error max-w-xl">
          <p>Error loading stake info: {stakeError.message}</p>
        </div>
      </div>
    );
  }

  const hasStake = stakeInfo && stakeInfo[0] > 0n;
  const cooldownEnded = stakeInfo && stakeInfo[3] && BigInt(Date.now()) / 1000n >= stakeInfo[4];
  const isButtonDisabled = isApprovePending || isDepositPending || isProcessing || !amount || !isConnected;

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-base-200 rounded-box mb-8 px-2">
      <div className="text-center">
        <div className="max-w-3xl w-full">
          {!hasStake ? (
            <StakeForm
              amount={amount}
              setAmount={setAmount}
              onDeposit={handleDeposit}
              isButtonDisabled={isButtonDisabled}
              isApprovePending={isApprovePending}
              isDepositPending={isDepositPending}
              isProcessing={isProcessing}
            />
          ) : (
            <StakeInfo
              stakeInfo={stakeInfo}
              onStartCooldown={handleStartCooldown}
              onWithdrawAndDonate={handleWithdrawAndDonate}
              isCooldownPending={isCooldownPending}
              isWithdrawPending={isWithdrawPending}
              selectedCause={selectedCause}
              setIsModalOpen={setIsModalOpen}
              cooldownEnded={!!cooldownEnded}
            />
          )}
        </div>
      </div>

      <CauseSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={id => setSelectedCause(id.toString())}
        selectedCauseId={selectedCause}
      />
    </div>
  );
}
