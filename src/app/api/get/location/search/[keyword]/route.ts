import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

interface params {
	params: {
		keyword: string;
	};
}

export async function GET(req: NextRequest, params: params) {
	// Get the keyword from the params
	const keyword = params.params.keyword;

	let headers = {
		'Content-Type': 'application/json',
	};

	const session = await getServerSession(authOptions);
	if (!session) {
		return new Response(
			JSON.stringify({
				message: 'Unauthorized',
			}),
			{ headers, status: 401 }
		);
	}

	const { searchParams } = new URL(req.url);
	const all = searchParams.get('all') === 'true';
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '10', 10);
	const skip = (page - 1) * limit;

	try {
		if (all) {
			const locations = await prisma.locations.findMany({
				where: {
					OR: [
						{
							location_name: {
								contains: keyword,
							},
						},
						{
							Routes: {
								OR: [
									{
										route_name: {
											contains: keyword,
										},
									},
									{
										category: {
											contains: keyword,
										},
									},
								],
							},
						},
					],
				},
				include: {
					Routes: true,
				},
				orderBy: {
					location_id: 'asc',
				},
			});

			// Get the total count of locations
			const totalLocations = await prisma.locations.count({
				where: {
					OR: [
						{
							location_name: {
								contains: keyword,
							},
						},
						{
							Routes: {
								OR: [
									{
										route_name: {
											contains: keyword,
										},
									},
									{
										category: {
											contains: keyword,
										},
									},
								],
							},
						},
					],
				},
			});

			return new Response(JSON.stringify({ locations, totalLocations, page: 1, limit: totalLocations }), {
				status: 200,
				headers,
			});
		} else {
			// Get all locations containing the keyword including which route they are in based on route_name
			const locations = await prisma.locations.findMany({
				skip,
				take: limit,
				where: {
					OR: [
						{
							location_name: {
								contains: keyword,
							},
						},
						{
							Routes: {
								OR: [
									{
										route_name: {
											contains: keyword,
										},
									},
									{
										category: {
											contains: keyword,
										},
									},
								],
							},
						},
					],
				},
				include: {
					Routes: true,
				},
				// sort
				orderBy: {
					location_id: 'asc',
				},
			});

			// Get the total count of locations
			const totalLocations = await prisma.locations.count({
				where: {
					OR: [
						{
							location_name: {
								contains: keyword,
							},
						},
						{
							Routes: {
								OR: [
									{
										route_name: {
											contains: keyword,
										},
									},
									{
										category: {
											contains: keyword,
										},
									},
								],
							},
						},
					],
				},
			});

			return new Response(JSON.stringify({ locations, totalLocations, page, limit }), {
				status: 200,
				headers,
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.name, error.message);
		}

		// Return an error message with status code 500 if an error occurs
		return new Response(JSON.stringify({ message: 'An error occurred' }), {
			status: 500,
			headers,
		});
	}
}
