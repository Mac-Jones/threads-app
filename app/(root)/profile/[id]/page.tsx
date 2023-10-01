import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';

const Page = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(params.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	return (
		<section>
			<ProfileHeader
				accountId={userInfo.id}
				authUserId={user.id}
				name={userInfo.name}
				username={userInfo.username}
				imgUrl={userInfo.image}
				bio={userInfo.bio}
			/>

			<div className='mt-9'>
				<Tabs defaultValue='threads' className='w-full'>
					<TabsList className='tab'>
						{profileTabs.map((tab) => (
							<TabsTrigger key={tab.label} value={tab.value} className='tab'>
								<Image
									src={tab.icon}
									alt={tab.label}
									height={24}
									width={24}
									className='object-contain'
								/>
								<p className='max-sm:hidden'>{tab.label}</p>

								{tab.label === 'Threads' && (
									<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
										{userInfo?.threads?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					{profileTabs.map((tab) => (
						<TabsContent
							key={`content-${tab.label}`}
							value={tab.value}
							className='w-full text-light-1'
						>
							<ThreadsTab
								currentUserId={user.id}
								accountId={userInfo.id}
								accountType='User'
							/>

							{/* <Card>
								<CardHeader>
									<CardTitle>Account</CardTitle>
									<CardDescription>
										Make changes to your account here. Click save when you're
										done.
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-2'>
									<div className='space-y-1'>
										<Label htmlFor='name'>Name</Label>
										<Input id='name' defaultValue='Pedro Duarte' />
									</div>
									<div className='space-y-1'>
										<Label htmlFor='username'>Username</Label>
										<Input id='username' defaultValue='@peduarte' />
									</div>
								</CardContent>
								<CardFooter>
									<Button>Save changes</Button>
								</CardFooter>
							</Card> */}
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
};

export default Page;
