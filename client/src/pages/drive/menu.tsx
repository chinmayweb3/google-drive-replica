import { Button } from "@mui/material";
import { useRef } from "react";
import { useAppDispatch } from "../../config/reduxStore";
import { driveStore } from "../../store/drive/driveStore";

const Menu = () => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const uploadItem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await dispatch(driveStore.uploadFile(e.target.files[0]));
    }
  };
  return (
    <div className="mb-[40px] flex gap-[30px] border-b border-stone-500 pb-[40px]">
      <div className="relative">
        <Button onClick={() => uploadRef?.current?.click()} variant="contained">
          Upload File
        </Button>
        <input
          onChange={uploadItem}
          ref={uploadRef}
          className="invisible absolute left-0 top-0 inline-block h-full w-full"
          type="file"
        />
      </div>
      <Button variant="contained">Create Folder</Button>
    </div>
  );
};

export default Menu;
