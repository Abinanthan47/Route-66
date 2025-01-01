import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyListing from './components/MyListing'
import Inbox from "./components/Inbox"
import Header from "@/Header"


function Profile() {
    return (
        <div>
            <Header /> 
            <div className='px-10 md:px-20 my-10'>
                <Tabs defaultValue="my-listing" className="w-full items-start ">
                    <TabsList>
                        <TabsTrigger value="my-listing">
                            My Listing
                        </TabsTrigger>
                        <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        
                    </TabsList>
                    <TabsContent value="my-listing">
                        <MyListing />
                    </TabsContent>
                    <TabsContent value="inbox">
                        <Inbox/>
                    </TabsContent>
                  
                </Tabs>


            </div>

        </div>
    )
}

export default Profile