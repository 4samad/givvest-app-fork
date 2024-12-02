import { CauseCard } from "./CauseCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface CauseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
  selectedCauseId: string;
}

export const CauseSelectionModal = ({ isOpen, onClose, onSelect, selectedCauseId }: CauseSelectionModalProps) => {
  const { data: tokenCount, isLoading } = useScaffoldReadContract({
    contractName: "GivvestCause",
    functionName: "tokenCount",
  });

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg mb-4">Select a Cause to Donate Yield</h3>
        <div className="max-w-7xl flex gap-8 flex-wrap justify-center">
          {!isLoading &&
            tokenCount &&
            Array.from({ length: Number(tokenCount) }).map((_, i) => (
              <CauseCard
                key={i}
                causeId={i}
                onSelect={id => {
                  onSelect(id);
                  onClose();
                }}
                selectedCauseId={selectedCauseId}
              />
            ))}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
