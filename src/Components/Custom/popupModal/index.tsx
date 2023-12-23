import { ReactNode, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function PopupModal({
  title,
  isOpen,
  closeModal,
  children,
}: {
  isOpen: boolean;
  title: string;
  closeModal: () => void;
  children: ReactNode;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center  p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[500px] transform rounded-3xl bg-sky-600  p-2 text-left align-middle overflow-hidden  transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 shadow-xl  bg-sky-600 text-white   py-4 px-3  flex justify-between z-10 relative"
                >
                  <span className="text-[24px] ">{title}</span>

                  <button type="button" onClick={closeModal}>
                    <XMarkIcon className="w-6 h-6 bg-white rounded-full text-sky-600 " />
                  </button>
                </Dialog.Title>
                <div className="flex flex-wrap gap-6 p-6 bg-white rounded-b-2xl w-full">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
