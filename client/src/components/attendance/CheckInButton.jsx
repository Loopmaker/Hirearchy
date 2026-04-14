import { useState } from 'react'
import {Loader2Icon, LogInIcon, LogOutIcon} from 'lucide-react'
import api from '../../api/axios';
import toast from 'react-hot-toast';

const CheckInButton = ({todayRecord, onAction}) => {
  const [loading, setLoading] = useState(false);

  const handleAttendace = async() => {
    setLoading(true);
    try {
      await api.post("/attendance");
      onAction();
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }
    setLoading(false);
  }

  if(todayRecord?.checkOut){
    return(
      <div className='flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200'>
        <h3 className='text-lg font-bold text-slate-900'>Work Day Completed</h3>
        <p className='text-slate-500 text-sm mt-1'>Great job! See you tommorow</p>
      </div>
    )
  }

  const isCheckIn = !!todayRecord?.checkIn;
  return (
    <div className='absolute bottom-4 right-4 flex flex-col z-1'>
      <button onClick={handleAttendace} disabled={loading} className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-linear-to-br text-white ${isCheckIn ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} hover:bg-gray-700 transition-colors duration-200 cursor-pointer`}>

        {loading ? <Loader2Icon className='size-7 animate-spin'/> : isCheckIn ? <LogOutIcon className='size-7'/>: <LogInIcon className='size-7'/> }

        <div className='relative flex flex-col items-center text-center'>
          <h2 className='text-lg font-medium mb-1'>{loading ? 'Processing...': isCheckIn ? 'Clock Out': 'Clock In' }</h2>
          <p className='text-xs opacity-80'>{isCheckIn ? 'Click to end your shift' : 'Start your work day'}</p>
        </div>
      </button>
    </div>
  )
}

export default CheckInButton